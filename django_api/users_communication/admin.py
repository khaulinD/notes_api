from django.contrib import admin

from users_communication.models import Feedback

#
# from .models import Sharing
#
#
# # Register your models here.
# class SharingAdmin(admin.ModelAdmin):
#     list_display = ("owner", "note", "can_edit", )
#
# admin.site.register(Sharing, SharingAdmin)
admin.site.register(Feedback)
