from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
import sys

sys.path.append('../network')


# Where to upload profile pics
def pfp_upload_to(instance, filename):
    return f'profile_pics/{filename}'


# Where to upload post pics
def post_upload_to(instance, filename):
    return f'post_pics/{filename}'


# Create your models here.


class Post(models.Model):
    group = models.IntegerField(null=True, blank=True)
    author = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    text = models.CharField(max_length=2048)
    image = models.ImageField(upload_to=post_upload_to, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    likes = models.IntegerField(default=0, blank=True)
    comments = models.IntegerField(default=0, blank=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    replies = models.IntegerField(default=0)


class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    author = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    text = models.CharField(max_length=1024, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)


class PostLike(models.Model):
    user = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class CommentLike(models.Model):
    user = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    comment = models.ForeignKey(Post, on_delete=models.CASCADE)


class ReplyLike(models.Model):
    user = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    # Django raises an exception when running makemigrations if the field below is non-nullable, absolutely no idea why
    # (like, it works fine in the previous 2 identical models)
    # Hence null=True
    reply = models.ForeignKey(Comment, null=True, on_delete=models.CASCADE)


class ProfilePicture(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to=pfp_upload_to, default='profile_pics/default.jpg')


class Group(models.Model):
    name = models.CharField(max_length=64, unique=True)
    creator = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)


class GroupMembers(models.Model):
    user = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    group = models.ForeignKey(Group, to_field='name', on_delete=models.CASCADE)