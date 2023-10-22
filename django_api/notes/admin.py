from django.contrib import admin

from .models import Notes, Sharing

class NotesAdmin(admin.ModelAdmin):
    list_display = ("title", "text", "creator")
    list_filter = ("created_at", )

class SharingAdmin(admin.ModelAdmin):
    list_display = ("users", "note", "can_edit")
    list

admin.site.register(Notes, NotesAdmin)
admin.site.register(Sharing, SharingAdmin)
