from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class User(User):
    pass


class Post(models.Model):
    pass


class Message(models.Model):
    pass


class Comment(models.Model):
    pass
