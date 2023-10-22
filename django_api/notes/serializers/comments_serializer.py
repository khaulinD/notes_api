from rest_framework import serializers

from notes.models import Comments


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

    def create(self, validated_data):
        comment = Comments.objects.create(**validated_data)
        return comment
