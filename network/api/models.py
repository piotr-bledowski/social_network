from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
import sys

sys.path.append('../network')


# Create your models here.


class Post(models.Model):
    group = models.IntegerField(null=True, blank=True)
    author = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    text = models.CharField(max_length=2048)
    image = models.ImageField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    likes = models.IntegerField(default=0, blank=True)
    comments = models.IntegerField(default=0, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    responses = models.IntegerField(default=0)


class CommentResponse(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)


class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class ProfilePicture(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(null=True, blank=True)