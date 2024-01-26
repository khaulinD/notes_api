
from django.urls import path, include, re_path
from rest_framework import routers
from notes import views

from users_communication.views import SharingViewSet

router = routers.DefaultRouter()
router.register(r'notes', views.NotesViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'sharing', SharingViewSet)

urlpatterns_notes = [
    path('api/', include(router.urls)),
]