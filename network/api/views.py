from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post, Comment, CommentResponse, PostLike
from .serializers import PostSerializer, CommentSerializer, CommentResponseSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# JWT views (customizing information the token contains, such as username)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.


@api_view(['GET'])
def index(request):
    return Response({
        "Create new post": '/create_post/',
        "Get a specific post": '/get_post/<int:id>',
        "Edit a specific post": '/edit_post/<int:id>',
        "Get all posts": '/get_all_posts/',
        "Get user's posts": '/get_users_posts/<str:username>',
        "Get all public posts": 'get_public_posts', # to delete later
        "Like a post": "/like_post/<int:id>",
        "Unlike a post": "/unlike_post/<int:id>",
    })


@api_view(['POST'])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response('INVALID POST DATA')


@api_view(['GET'])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_users_posts(request, username):
    user = User.objects.get(username=username)
    posts = Post.objects.filter(author=user)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_post(request, id):
    post = Post.objects.get(id=id)
    serializer = PostSerializer(post)
    return Response(serializer.data)


@api_view(['POST'])
def edit_post(request, id):
    pass


@api_view(['GET'])
def get_public_posts(request):
    posts = Post.objects.filter(group=None)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_group_posts(request, id):
    pass


@api_view(['POST'])
def like_post(request, id):
    post = Post.objects.get(id=id)
    new_like = PostLike(user=request.user, post=post)
    new_like.save() # add record to PostLike table
    post.likes += 1
    post.save() # update post with increased likes number
    return Response({f"post {id} liked by": f" user {request.user}"})


@api_view(['DELETE'])
def unlike_post(request, id):
    post = Post.objects.get(id=id)
    unline = PostLike.objects.get(user=request.user, post=post)
    unline.delete() # remove record from PostLike table
    post.likes -= 1
    post.save() # update post with decreased likes number
    return Response({f"post {id} unliked by": f" user {request.user}"})