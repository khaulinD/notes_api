from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from .models import Account
from .utils import generate_token

def verification_email(username, request):
    user = Account.objects.get(username=username)
    current_site = request.build_absolute_uri('/')

    html_body = render_to_string("email_template.html",
                                 {'username': username,
                                    "domain": current_site,
                                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                                    "token": generate_token.make_token(user)
                                  })

    msg = EmailMultiAlternatives(subject='Verification Email', to=[user.email])
    msg.attach_alternative(html_body, 'text/html')
    msg.send()
