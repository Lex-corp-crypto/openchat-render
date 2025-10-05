from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from .models import ChatRoom, Message
import json

@login_required
def index(request):
    rooms = ChatRoom.objects.filter(is_public=True)
    return render(request, 'chat/index.html', {'rooms': rooms})

@login_required
def create_room(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        
        if name:
            # Nettoyer le nom (pas d'espaces, caractères spéciaux)
            name = name.replace(' ', '_').lower()
            
            # Vérifier si la salle existe déjà
            if not ChatRoom.objects.filter(name=name).exists():
                room = ChatRoom.objects.create(
                    name=name,
                    description=description,
                    is_public=True
                )
                return redirect('chat:chat_room', room_name=room.name)
            else:
                # Gérer le cas où la salle existe déjà
                return render(request, 'chat/create_room.html', {
                    'error': 'Une salle avec ce nom existe déjà'
                })
    
    return render(request, 'chat/create_room.html')

@login_required
def chat_room(request, room_name):
    room = get_object_or_404(ChatRoom, name=room_name)
    messages = Message.objects.filter(room=room).select_related('user')[:50]
    
    return render(request, 'chat/room.html', {
        'room': room,
        'messages': messages,
    })

@login_required
def room_messages(request, room_name):
    room = get_object_or_404(ChatRoom, name=room_name)
    messages = Message.objects.filter(room=room).select_related('user')[:50]
    
    messages_data = []
    for message in messages:
        messages_data.append({
            'type': 'chat_message',
            'message': message.content,
            'user': message.user.username,
            'timestamp': message.timestamp.isoformat(),
            'message_id': message.id,
        })
    
    return JsonResponse(messages_data, safe=False)