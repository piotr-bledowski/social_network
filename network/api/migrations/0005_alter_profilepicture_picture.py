# Generated by Django 4.1 on 2022-09-16 20:49

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_profilepicture_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilepicture',
            name='picture',
            field=models.ImageField(blank=True, default='profile_pics/default.jpg', upload_to=api.models.pfp_upload_to),
        ),
    ]
