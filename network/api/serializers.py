from rest_framework import serializers
from .models import Group, GroupMember, ProfilePicture, User, Post, Comment, Reply, PostLike, CommentLike, ReplyLike


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'group', 'author', 'title',
                  'text', 'image', 'date', 'likes', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author',
                  'text', 'date', 'likes', 'replies']


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'comment', 'author', 'text', 'date', 'likes']


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