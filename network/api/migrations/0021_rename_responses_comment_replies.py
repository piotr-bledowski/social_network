# Generated by Django 4.1 on 2022-09-13 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_rename_commentresponse_reply_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='responses',
            new_name='replies',
        ),
    ]
