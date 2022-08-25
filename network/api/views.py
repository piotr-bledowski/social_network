from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post, Comment, CommentResponse
from .serializers import PostSerializer, CommentSerializer, CommentResponseSerializer

# Create your views here.


@api_view()
def index(request):
    return Response({
        "Create new post": '/create_post',
        "Get a specific post": '/get_post/<int:id>',
        "Edit a specific post": '/edit_post/<int:id>',
        "Get all posts": '/get_all_posts',
        "Get all public posts": 'get_public_posts',
    })


@api_view()
def create_post(request):
    pass


@api_view()
def get_all_posts(request):
    posts = Post.objects.all()
    serialized_posts = PostSerializer(posts, many=True)
    return Response(serialized_posts.data)


@api_view()
def get_post(request, post_id):
    pass


@api_view()
def edit_post(request, post_id):
    pass


@api_view()
def get_public_posts(request):
    pass


@api_view()
def get_group_posts(request, group_id):
    pass
