from dataclasses import field
from rest_framework import serializers
from .models import Friend, FriendRequest, CommentNotification, ReplyNotification, Group, GroupMember, Message, ProfilePicture, User, Post, Comment, Reply, PostLike, CommentLike, ReplyLike


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'group', 'author', 'title',
                  'text', 'image', 'public', 'date', 'likes', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author',
                  'text', 'date', 'likes', 'replies', 'read']


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'comment', 'author', 'text', 'date', 'likes', 'read']


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ['user', 'post']


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ['user', 'comment']


class ReplyLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyLike
        fields = ['user', 'reply']


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = ['user', 'picture']
    

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'creator', 'picture', 'members']


class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = ['user', 'group']


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['id', 'user1', 'user2']


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'sender', 'receiver', 'date']


class CommentNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentNotification
        fields = ['id', 'sender', 'receiver', 'post', 'date']


class ReplyNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyNotification
        fields = ['id', 'sender', 'receiver', 'comment', 'date']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'date', 'text', 'read']