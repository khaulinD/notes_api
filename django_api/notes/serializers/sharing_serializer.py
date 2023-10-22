from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from ..models import Sharing
from .notes_serializers import NotesSerializer



class SharingSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    @extend_schema_field(serializers.CharField())
    def get_users(self, obj):
        return obj.users.username
    note = NotesSerializer()
    class Meta:
        model = Sharing
        fields = "__all__"

