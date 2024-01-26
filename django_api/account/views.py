from django.core.checks import messages
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, get_object_or_404
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_decode
from django_filters.rest_framework import DjangoFilterBackend
from django_ratelimit.decorators import ratelimit
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .email_verification.emails import verification_email
from .filters.account_filter import AccountFilter
from .models import Account
# from .schemas import user_list_docs
from .serializers.account import AccountSerializer, MyTokenObtainPairSerializer, RegisterSerializer, LogoutSerializer
from .email_verification.utils import generate_token



class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    # permission_classes = [IsAuthenticated]
    serializer_class = AccountSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AccountFilter

    @method_decorator(ratelimit(key='ip', rate='10/m', method='GET', block=True))
    def list(self, request):
        queryset = self.filterset_class(request.GET, self.queryset).qs
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class LogoutView(APIView):
    serializer_class = LogoutSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)

            refresh_token = serializer.validated_data["refresh_token"]
            token = RefreshToken(refresh_token)
            # token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
class RegisterView(APIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            forbidden_usernames = ["admin", "root", "superuser"]
            if username in forbidden_usernames:
                return Response({"error": "Username not allowed"}, status=status.HTTP_409_CONFLICT,)
            serializer.save()
            try:
                verification_email(username, request)
            except Exception as e:
                print("email verification failed", e)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            # if activate_user:
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)
            # return Response(status=status.HTTP_400_BAD_REQUEST)

        errors = serializer.errors
        if "username" in errors and "non_field_errors" not in errors:
            return Response({"error": "Username already exists"}, status=status.HTTP_409_CONFLICT)

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


def activate_user(request, uidb64, token):

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Account.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Account.DoesNotExist) as e:
        user = None

    if user and generate_token.check_token(user, token):
        user.is_verified = True
        user.save()
        # Активация прошла успешно, возвращаем сообщение об этом
        return HttpResponse("User activated successfully")

    # В случае неудачи активации, возвращаем ошибку
    return HttpResponse("Activation failed", status=status.HTTP_400_BAD_REQUEST)

class JWTCookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
