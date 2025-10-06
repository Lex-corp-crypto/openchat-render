from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create_room, name='create_room'),
    path('<str:room_name>/', views.chat_room, name='chat_room'),
    path('<str:room_name>/messages/', views.room_messages, name='room_messages'),
    path('<str:room_name>/delete/', views.delete_room, name='delete_room'),
]