from django.contrib import admin
from .models import Notes
from account.models import Account


class NoteToUserInline(admin.TabularInline):
    model = Notes.extra_user.through
    extra = 1

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'created_at', 'is_in_basket')
    inlines = [NoteToUserInline]

# class AccountAdmin(admin.ModelAdmin):
#     filter_horizontal = ('shared_notes',)

admin.site.register(Notes, NoteAdmin)
# admin.site.register(Account, AccountAdmin)