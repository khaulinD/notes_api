from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)
from . import views
router = routers.DefaultRouter()
router.register(r'accounts', views.AccountViewSet, basename='account')
# router.register(r'logout', views.LogoutView, basename='logout')


urlpatterns_account = [
    path('api/token/', views.JWTCookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('home/', views.AccountViewSet.as_view(), name ='home'),
    path('accounts/logout/', views.LogoutView.as_view(), name='logout'),
    path("accounts/register/", views.RegisterView.as_view(), name='register'),
    path("<uidb64>/<token>/", views.activate_user, name='activate_user'),
    path("", include(router.urls))
]