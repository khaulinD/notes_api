from django.contrib import admin

from .models import Account
class AccountAdmin(admin.ModelAdmin):
    list_display =("username", "email", "is_staff", "is_active", "logo", "date_joined", "is_verified")


admin.site.register(Account, AccountAdmin)
