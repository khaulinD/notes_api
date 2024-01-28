from django.urls import include, path
from rest_framework import routers

from users_communication import views


urlpatterns_user_communication = [
    path('api/feedback/', views.FeedbackView.as_view(), name='feedback'),
]