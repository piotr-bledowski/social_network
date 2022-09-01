from social_network.models import User
from django.db import models
import sys

sys.path.append('../network')


# Create your models here.


class Post(models.Model):
    group_id = models.IntegerField(null=True, blank=True)
    author = models.CharField(max_length=32, blank=False)
    title = models.CharField(max_length=64, blank=False)
    text = models.CharField(max_length=2048)
    image = models.ImageField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)


class Comment(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, auto_created=True)
    post_id = models.IntegerField(blank=False)
    author = models.CharField(max_length=32, blank=False)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    responses = models.IntegerField(default=0)


class CommentResponse(models.Model):
    id = models.IntegerField(primary_key=True, unique=True, auto_created=True)
    comment_id = models.IntegerField(blank=False)
    author = models.CharField(max_length=32, blank=False)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
