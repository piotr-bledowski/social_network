from rest_framework import serializers
from .models import User, Post, Comment, CommentResponse


class UserSerializer(serializers.Serializer):
    usernane = serializers.CharField()
    email = serializers.EmailField()


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'group_id', 'author', 'title',
                  'text', 'image', 'date', 'likes', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'post_id', 'author',
                  'text', 'date', 'likes', 'responses']


class CommentResponseSerializer(serializers.ModelSerializer):
    comment = CommentSerializer()
    author = UserSerializer()

    class Meta:
        model = CommentResponse
        fields = ['id', 'comment_id', 'author', 'text', 'date', 'likes']
