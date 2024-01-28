from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from account.urls import urlpatterns_account
from notes.urls import urlpatterns_notes
from users_communication.urls import urlpatterns_user_communication



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),

] + urlpatterns_account + urlpatterns_notes + urlpatterns_user_communication

# websocket_urlpatterns = [
#     path(r'ws/note/', NotesConsumer.as_asgi()),
# ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)