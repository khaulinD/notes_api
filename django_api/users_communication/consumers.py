# # import json
# #
# # from asgiref.sync import sync_to_async
# # from channels.generic.websocket import AsyncWebsocketConsumer
# # from django.db.models import Prefetch, Q
# # from notes.models import Notes, NoteToUser
# #
# #
# # class NotesConsumer(AsyncWebsocketConsumer):
# #     async def connect(self):
# #         self.group_name = "notes_group"  # Название группы для обновлений
# #         await self.channel_layer.group_add(self.group_name, self.channel_name)
# #         await self.accept()
# #
# #     async def disconnect(self, close_code):
# #         await self.channel_layer.group_discard(self.group_name, self.channel_name)
# #
# #
# #     async def receive(self, text_data):
# #         received_data = json.loads(text_data)  # Parse the received JSON data
# #         # Process the received data from the client (stored in local storage)
# #         print(received_data)
# #         await self.send(text_data=await self.get_shared_notes(received_data["user_id"]))
# #     @staticmethod
# #     @sync_to_async
# #     def get_shared_notes(user):
# #         # # Define a Prefetch object to fetch related users and their permissions
# #         # users_prefetch = Prefetch(
# #         #     'notetouser_set',
# #         #     queryset=NoteToUser.objects.select_related('user').filter(
# #         #         Q(user=user)
# #         #     ),
# #         #     to_attr='note_permissions'
# #         # )
# #         #
# #         # # Filter notes by the creator and prefetch related users and their permissions
# #         # notes = Notes.objects.filter(creator=user).prefetch_related(users_prefetch)
# #         notes = Notes.objects.filter(
# #             Q(creator=user) | Q(extra_user=user)
# #         ).prefetch_related(
# #             'extra_user',  # Fetch extra_user related data
# #             'notetouser_set'  # Fetch NoteToUser related data
# #         ).select_related('creator')  # Fetch creator related data
# #         print(notes)
# #         notes_data = [
# #             {
# #                 "id": note.id,
# #                 'title': note.title,
# #                 'text': note.text,
# #                 'created_at': note.created_at.isoformat(),
# #                 'is_in_basket': note.is_in_basket,
# #                 'creator': note.creator.id,  # Retrieve the ID of the creator
# #                 'extra_user': [
# #                     {
# #                         'id': user.id,
# #                         'username': user.username,
# #                         'logo_url': user.logo.url if user.logo else None,
# #                         'can_edit': permission.can_edit
# #                     }
# #                     for user, permission in zip(note.extra_user.all(), note.notetouser_set.all())
# #                 ]
# #             }
# #             for note in notes
# #         ]
# #         return json.dumps({'notes': notes_data})
# from channels.db import database_sync_to_async
# from django.db.models import Q
# from djangochannelsrestframework.observer import model_observer
# from djangochannelsrestframework.observer.generics import (ObserverModelInstanceMixin, action)
# from notes.models import Notes
# from notes.serializers.notes_serializers import NotesSerializer
# from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
# from rest_framework import status
# from channels.layers import get_channel_layer
#
# class NotesConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
#     queryset = Notes.objects.all()
#     serializer_class = NotesSerializer
#
#     async def connect(self, **kwargs):
#         await self.model_change.subscribe()
#         await super().connect()
#
#     @action()
#     def list(self, **kwargs):
#         queryset = Notes.objects.filter(
#             Q(creator=kwargs['user']) | Q(extra_user=kwargs['user'])
#         ).prefetch_related(
#             'extra_user',  # Fetch extra_user related data
#             'notetouser_set'  # Fetch NoteToUser related data
#         ).select_related('creator')
#         print(queryset)
#         # queryset = self.filter_queryset(self.get_queryset(**kwargs), **kwargs)
#         serializer = self.get_serializer(
#             instance=queryset, many=True, action_kwargs=kwargs
#         )
#         return serializer.data, status.HTTP_200_OK
#
#     @model_observer(Notes)
#     async def model_change(self, message, observer=None, **kwargs):
#         changed_instance = message.get('data')
#         action = message.get('action')
#
#         # Identify relevant users and creator for the changed note
#         relevant_users = await self.get_all_users(changed_instance)
#         print(relevant_users)
#         # Filter WebSocket connections based on relevant users
#         for user in relevant_users:
#             user_channel_name = f"user_{user.id}"  # Adjust as per your channel naming convention
#             await self.send_json(user_channel_name, message)
#
#     @model_change.serializer
#     def model_serialize(self, instance, action, **kwargs):
#         return dict(data=NotesSerializer(instance=instance).data, action=action.value)
#
#     @database_sync_to_async
#     def get_all_users(self, changed_instance):
#         note_id = changed_instance.get('id')  # Assuming 'id' is the primary key of the Note model
#         note = Notes.objects.get(id=note_id)
#         relevant_users = [note.creator] + list(note.extra_user.all())  # Including creator and additional users
#         return relevant_users


# import json
#
# from channels.generic.websocket import WebsocketConsumer
# from asgiref.sync import async_to_sync
#
# class NotesConsumer(WebsocketConsumer):
#     def connect(self):
#         self.room_group_name = 'notes'
#
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )
#
#         self.accept()
#
#     def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['user']
#
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 # "type": 'chat_messsage',
#                 "message": message
#             }
#         )
#
#     def chat_message(self, event):
#         message = event['message']
#         self.send(text_data=json.dumps({
#             # "type": 'chat',
#             "message": message
#         }))

# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.db.models import Q
# from notes.models import Notes
#
#
# class NotesConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user = self.scope['user']
#         await self.accept()
#
#         # Get all notes for which the user is a creator or extra user
#         user_notes = await self.get_user_notes(self.user)
#
#         # Create a group for each note and add the user to those groups
#         for note in user_notes:
#             await self.channel_layer.group_add(f"note_{note.id}", self.channel_name)
#
#     async def disconnect(self, close_code):
#         # Disconnect from all groups on WebSocket disconnect
#         user_notes = await self.get_user_notes(self.user)
#         for note in user_notes:
#             await self.channel_layer.group_discard(f"note_{note.id}", self.channel_name)
#
#     async def receive(self, text_data):
#         # Handle incoming WebSocket messages
#         pass
#
#     @database_sync_to_async
#     def get_user_notes(self, user):
#         # Fetch all notes where the user is the creator or an extra user
#         return Notes.objects.filter(Q(creator=user) | Q(extra_user=user))
#
#     async def send_note_message(self, note_id, message):
#         # Send a message to a specific note group
#         await self.channel_layer.group_send(
#             f"note_{note_id}",
#             {
#                 "type": "note.message",
#                 "message": message,
#             }
#         )
#
#     async def note_message(self, event):
#         # Receive message from note group
#         message = event['message']
#
#         # Send message to WebSocket
#         await self.send(text_data=message)

