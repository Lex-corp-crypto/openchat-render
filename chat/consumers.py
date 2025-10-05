import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import ChatRoom, Message, RoomParticipant

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        self.user = self.scope['user']

        # Rejoindre le groupe room
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        await self.accept()
        
        # Mettre à jour le statut en ligne
        if self.user.is_authenticated:
            await self.update_user_online_status(True)
            
            # Envoyer la liste des utilisateurs en ligne
            await self.send_online_users()

    async def disconnect(self, close_code):
        # Quitter le groupe room
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )
        
        # Mettre à jour le statut hors ligne
        if self.user.is_authenticated:
            await self.update_user_online_status(False)
            await self.send_online_users()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type', 'chat_message')
        
        if message_type == 'chat_message':
            message = text_data_json['message']
            user = self.user.username
            
            # Sauvegarder le message dans la base de données
            saved_message = await self.save_message(message)
            
            # Envoyer le message au groupe
            await self.channel_layer.group_send(
                self.room_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'user': user,
                    'timestamp': saved_message.timestamp.isoformat(),
                    'message_id': saved_message.id,
                }
            )
        elif message_type == 'typing':
            await self.channel_layer.group_send(
                self.room_name,
                {
                    'type': 'user_typing',
                    'user': self.user.username,
                    'typing': text_data_json['typing']
                }
            )

    async def chat_message(self, event):
        # Envoyer le message au WebSocket
        await self.send(text_data=json.dumps({
            'type': 'chat_message',
            'message': event['message'],
            'user': event['user'],
            'timestamp': event['timestamp'],
            'message_id': event['message_id'],
        }))

    async def user_typing(self, event):
        await self.send(text_data=json.dumps({
            'type': 'user_typing',
            'user': event['user'],
            'typing': event['typing']
        }))

    @database_sync_to_async
    def save_message(self, message):
        room = ChatRoom.objects.get(name=self.room_name)
        message_obj = Message.objects.create(
            room=room,
            user=self.user,
            content=message
        )
        return message_obj

    @database_sync_to_async
    def update_user_online_status(self, online):
        try:
            room = ChatRoom.objects.get(name=self.room_name)
            participant, created = RoomParticipant.objects.get_or_create(
                user=self.user,
                room=room
            )
            participant.online = online
            participant.save()
            
            # Mettre à jour le statut global de l'utilisateur
            self.user.online = online
            self.user.save()
        except ChatRoom.DoesNotExist:
            pass

    @database_sync_to_async
    def get_online_users(self):
        try:
            room = ChatRoom.objects.get(name=self.room_name)
            online_users = RoomParticipant.objects.filter(
                room=room, 
                online=True
            ).select_related('user')
            return [participant.user.username for participant in online_users]
        except ChatRoom.DoesNotExist:
            return []

    async def send_online_users(self):
        online_users = await self.get_online_users()
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'online_users',
                'users': online_users
            }
        )

    async def online_users(self, event):
        await self.send(text_data=json.dumps({
            'type': 'online_users',
            'users': event['users']
        }))