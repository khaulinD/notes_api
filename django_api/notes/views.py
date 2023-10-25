from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .filters.notes_filter import NoteFilters
from .filters.sharing_filters import SharingFilter
from .models import Notes, Comments, Sharing, NotesBasket
from .schemas import note_list_view
from .serializers.notes_serializers import NotesSerializer
from .serializers.comments_serializer import CommentsSerializer
from .serializers.sharing_serializer import SharingSerializer
from .serializers.notesbasket_serializer import NotesBasketSerializer
from django_filters import rest_framework as filters

# Create your views here.



class NotesViewSet(viewsets.ViewSet):
    queryset = Notes.objects.order_by('-id').all()
    serializer_class = NotesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = NoteFilters


    def list(self, request):
        queryset = self.filterset_class(request.GET, self.queryset).qs
        serializer = NotesSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the object to the database
            serializer.save()

            # Create a response dictionary with the created object's data
            response_data = {
                'message': 'Note created successfully',
                'data': serializer.data
            }

            # Return a success response with the response data and a status code of 201 (Created)
            return Response(response_data, status=status.HTTP_201_CREATED)

        # If the data is not valid, return a response with the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #
    def retrieve(self, request, pk=None):
        queryset = Notes.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = NotesSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        note = get_object_or_404(self.queryset, pk=pk)
        serializer = NotesSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        # Удаление существующего объекта
        note = get_object_or_404(self.queryset, pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentViewSet(viewsets.ViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the object to the database
            serializer.save()

            # Create a response dictionary with the created object's data
            response_data = {
                'message': 'Comment created successfully',
                'data': serializer.data
            }

            # Return a success response with the response data and a status code of 201 (Created)
            return Response(response_data, status=status.HTTP_201_CREATED)

        # If the data is not valid, return a response with the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #
    def destroy(self, request, pk=None):
        comment = get_object_or_404(self.queryset, pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SharingViewSet(viewsets.ViewSet):
    queryset = Sharing.objects.select_related("note").select_related("users").all()
    serializer_class = SharingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SharingFilter

    def list(self, request):
        queryset = self.filterset_class(request.GET, self.queryset).qs
        serializer = SharingSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        one_sharing_note = get_object_or_404(self.queryset, pk=pk)
        serializer = SharingSerializer(one_sharing_note)
        return Response(serializer.data)


class NotesBasketViewSet(viewsets.ViewSet):
    queryset = NotesBasket.objects.all()
    serializer_class = NotesBasketSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)