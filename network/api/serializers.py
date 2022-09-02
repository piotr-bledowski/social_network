from rest_framework import serializers
from .models import User, Post, Comment, CommentResponse


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    class Meta:
        model = Post
        fields = ['id', 'group', 'author', 'title',
                  'text', 'image', 'date', 'likes', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author',
                  'text', 'date', 'likes', 'responses']


class CommentResponseSerializer(serializers.ModelSerializer):
    comment = CommentSerializer()
    author = UserSerializer()
    class Meta:
        model = CommentResponse
        fields = ['id', 'comment', 'author', 'text', 'date', 'likes']
