# Generated by Django 4.1 on 2022-09-02 21:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social_network', '0003_delete_comment_delete_message_delete_post'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
