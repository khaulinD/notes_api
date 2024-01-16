from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers
from notes import views

from account.urls import urlpatterns_account
from users_communication.consumers import NotesConsumer
from users_communication.views import SharingViewSet
router = routers.DefaultRouter()
router.register(r'notes', views.NotesViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'sharing', SharingViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    path('', include(router.urls)),

]+urlpatterns_account

# websocket_urlpatterns = [
#     path(r'ws/note/', NotesConsumer.as_asgi()),
# ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)