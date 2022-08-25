from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    usernane = serializers.CharField()
    email = serializers.EmailField()


class PostSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    author = UserSerializer()
    title = serializers.CharField()
    text = serializers.CharField()
    image = serializers.ImageField()
    date = serializers.DateTimeField()
    likes = serializers.IntegerField()
    comments = serializers.IntegerField()


class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    post = PostSerializer()
    author = UserSerializer()
    text = serializers.CharField()
    date = serializers.DateTimeField()
    likes = serializers.IntegerField()
    responses = serializers.IntegerField()


class CommentResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    comment = CommentSerializer()
    author = UserSerializer()
    text = serializers.CharField()
    date = serializers.DateTimeField()
    likes = serializers.IntegerField()
