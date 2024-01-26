#!/bin/sh

APP_PORT=${PORT:-8000}

echo "Waiting for postgres..."
sleep 5
echo "PostgreSQL started"

echo "Migrating database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "Database migrated"

#echo "Creating superuser..."
#python manage.py superuser || true
#echo "Superuser created"

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Static files collected"

echo "Starting server..."
gunicorn django_api.wsgi:application --preload --bind "0.0.0.0:${APP_PORT}" --workers 4

#python manage.py runserver