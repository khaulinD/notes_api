from rest_framework import serializers
from notes.models import NotesBasket

class NotesBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotesBasket
        fields = '__all__'