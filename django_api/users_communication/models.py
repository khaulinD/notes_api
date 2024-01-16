# from django.db import models
# from account.models import Account
#
# from notes.models import Notes

# , on_delete=models.SET_NULL, null=True, related_name="shared_users",
# class Sharing(models.Model):
#     users = models.ManyToManyField(Account, through='NoteToUser')
#     owner = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, related_name="owners")
#     note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name="sharing_note")
#     # can_edit = models.BooleanField(default=False)


#
# class Notes(models.Model):
#     extra_user = models.ManyToManyField(Account, through=NoteToUser)
#
# class Account(models.Model):
#     additional_note = models.ManyToManyField(Notes, through="NoteToUser")