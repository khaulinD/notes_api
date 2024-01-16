from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from notes.models import NoteToUser




class SharingSerializer(serializers.ModelSerializer):
    # note = NotesSerializer()

    @extend_schema_field(serializers.CharField())
    def get_users(self, obj):
        return obj.users.username
    # note = NotesSerializer()

    def create(self, validated_data):
        print(validated_data)
        sharing = NoteToUser.objects.create(**validated_data)
        return sharing
    class Meta:
        model = NoteToUser
        fields = ["can_edit", "user", "note"]

