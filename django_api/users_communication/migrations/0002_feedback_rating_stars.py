# Generated by Django 5.0.1 on 2024-01-28 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_communication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='rating_stars',
            field=models.IntegerField(default=0),
        ),
    ]
