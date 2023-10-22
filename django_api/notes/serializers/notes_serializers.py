from rest_framework import serializers

from notes.models import Notes


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'  # Включить все поля модели


    def update(self, instance, validated_data):
        # Обновление существующего объекта Notes
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance