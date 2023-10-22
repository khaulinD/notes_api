from django.contrib.auth.models import User
from django.db import models


class Notes(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note_creator")

    def __str__(self):
        return self.title



class Attachments(models.Model):
    note = models.ForeignKey(Notes, on_delete=models.CASCADE,)
    file = models.FileField(upload_to='')

class Sharing(models.Model):
    users = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="user")
    note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name="sharing_note")
    can_edit = models.BooleanField(default=False)


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments_user")
    note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name="comments_note")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField()
