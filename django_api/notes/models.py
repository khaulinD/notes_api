from django.db import models
from account.models import Account



class Notes(models.Model):
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="creator", db_index=True)
    is_in_basket = models.BooleanField(default=False)
    extra_user = models.ManyToManyField(Account, through="NoteToUser", related_name='extra_user')

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['creator', "is_in_basket"])
        ]





class NoteToUser(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    note = models.ForeignKey('Notes', on_delete=models.CASCADE)

    can_edit = models.BooleanField(default=False)


class Attachments(models.Model):
    note = models.ForeignKey(Notes, on_delete=models.CASCADE)
    file = models.FileField(upload_to='')



class Comments(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="comments_user")
    note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name="comments_note")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    text = models.TextField()
