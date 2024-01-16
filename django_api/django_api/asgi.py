# import os
#
# from channels.auth import AuthMiddlewareStack
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.conf import settings
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from debug_toolbar.middleware import DebugToolbarMiddleware
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
#
# from .urls import websocket_urlpatterns
# django_asgi_app = get_asgi_application()
#
# application = ProtocolTypeRouter(
#     {
#         "http": django_asgi_app,
#         "websocket": AllowedHostsOriginValidator(
#             AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
#         ),
#     }
# )


import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_api.settings')

application = get_asgi_application()
