# Generated by Django 4.1 on 2022-09-19 11:56

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_group_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='picture',
            field=models.ImageField(blank=True, default='group_pics/default_group.png', upload_to=api.models.group_upload_to),
        ),
    ]
