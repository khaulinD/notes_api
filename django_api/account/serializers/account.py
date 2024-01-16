from django.http import HttpResponseForbidden
from rest_framework import serializers, status

from account.models import Account
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ("username", "email", "logo", "is_verified", "password")



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("username", "password", "first_name", "last_name", "email")

        def is_valid(self, *, raise_exception=False):
            valid = super().is_valid(raise_exception=raise_exception)

            if valid:
                if Account.objects.filter(username=self.validated_data["username"]).exists():
                    self._errors["username"] = ["username already exists"]
                    raise PermissionDenied("username already exists")
                if Account.objects.filter(email=self.validated_data["email"]).exists():
                    self._errors["email"] = ["email already exists"]
                    return HttpResponseForbidden("email already exists")

            return valid

        def create(self, validated_data):
            user = Account.objects.create_user(**validated_data)
            return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token["example"] = "example"
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["is_verified"] = self.user.is_verified
        if not self.user.is_verified:
            raise PermissionDenied("Your account is not verified. Please verify your email address.")
        data["user_id"] = self.user.id

        return data


class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

