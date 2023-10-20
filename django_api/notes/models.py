from django.contrib.auth.models import User
from django.db import models


class Notes(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

class Attachments(models.Model):
    note = models.ForeignKey(Notes, on_delete=models.CASCADE)
    file = models.FileField(upload_to='')

class Sharing(models.Model):
    users = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.ForeignKey(Notes, on_delete=models.CASCADE)

class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Notes, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField()
