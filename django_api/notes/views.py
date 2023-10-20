from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Notes
from .serializers.notes_serializers import NotesSerializer


# Create your views here.


class NotesViewSet(viewsets.ViewSet):
    queryset = Notes.objects.all()

    def list(self, request):
        serializer = NotesSerializer(self.queryset, many=True)
        return Response(serializer.data)