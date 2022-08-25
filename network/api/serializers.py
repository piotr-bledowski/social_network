from rest_framework import serializers
from .models import User, Post, Comment, CommentResponse


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'group_id', 'author', 'title',
                  'text', 'image', 'date', 'likes', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post_id', 'author',
                  'text', 'date', 'likes', 'responses']


class CommentResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentResponse
        fields = ['id', 'comment_id', 'author', 'text', 'date', 'likes']
