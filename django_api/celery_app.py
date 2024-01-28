import os
import time

from celery import Celery
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_api.settings')

app = Celery('django_api')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings')

app.conf.broker_url = settings.CELERY_BROKER_URL

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


@app.task()
def debug_task():
    time.sleep(5)
    print("Hello from debug_task")
