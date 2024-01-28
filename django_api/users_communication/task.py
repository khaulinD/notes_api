import os
import logging
from celery import shared_task
from .models import Feedback
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

@shared_task
def process_feedback(feedback_id):
    try:
        logger.info(f"Processing feedback: {feedback_id}")
        feedback_data = Feedback.objects.filter(pk=feedback_id).values('rating_stars', 'message', 'sender__email').first()

        if feedback_data is not None:
            send_mail(
                f'New Feedback - Start: {feedback_data["rating_stars"]}',
                f'Received new feedback: {feedback_data["message"]}',
                feedback_data["sender__email"],
                [os.environ.get('EMAIL_HOST_USER')],
                fail_silently=False,
            )

            logger.info("Email sent successfully")
        else:
            logger.error(f"Feedback with id {feedback_id} not found")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
