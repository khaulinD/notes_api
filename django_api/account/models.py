from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models
def user_directory_path(instance, filename):
    username = instance.username
    return f'logos/{username}/{filename}'


# Create your models here.
class Account(AbstractUser):
    logo = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        """Хэширует пароль и сохраняет его в базе данных"""
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


