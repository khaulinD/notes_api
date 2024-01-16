from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from notes.models import Notes, NoteToUser


class NotesSerializer(serializers.ModelSerializer):
    # author = serializers.SerializerMethodField()
    extra_user = serializers.SerializerMethodField()
    class Meta:
        model = Notes
        fields = '__all__'

    # def get_author(self, obj):
    #     return obj.creator.username
    @extend_schema_field(dict)
    def get_extra_user(self, obj):
        extra_users_data = []
        for extra_user in obj.extra_user.all():
            extra_users_data.append({
                "user": extra_user.id,
                "can_edit": NoteToUser.objects.get(user=extra_user, note=obj).can_edit,
            })
        return extra_users_data

    def update(self, instance, validated_data):
        # Обновление существующего объекта Notes
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.is_in_basket = validated_data.get('is_in_basket', instance.is_in_basket)
        instance.creator = validated_data.get('creator', instance.creator)
        instance.save()
        return instance

    def create(self, validated_data):
        comment = Notes.objects.create(**validated_data)
        return comment


class NoteToUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteToUser
        fields = '__all__'  # Включить все поля модели
