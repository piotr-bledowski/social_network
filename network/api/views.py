from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post, Comment, CommentResponse, PostLike
from .serializers import PostSerializer, CommentSerializer, CommentResponseSerializer, PostSerializerCreate
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
        "Get a specific post": '/get_post/<int:post_id>',
        "Edit a specific post": '/edit_post/<int:post_id>',
        "Get all posts": '/get_all_posts/',
        "Get user's posts": '/get_users_posts/<str:username>',
        "Get all public posts": 'get_public_posts', # to delete later
        "Like a post": "/like_post/<int:post_id>",
        "Unlike a post": "/unlike_post/<int:post_id>",
        "Is this post liked by current user?": "/is_liked/<int:post_id>",
        "Get comments for a post": "/get_comments/<int:post_id>",
        "Get replies for a comment": "/get_replies/<int:comment_id>",
    })


@api_view(['POST'])
def create_post(request):
    print(request.data)
    serializer = PostSerializerCreate(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    print(serializer.errors)
    return Response('INVALID POST DATA')


@api_view(['GET'])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data[::-1])


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
    return Response(serializer.data[::-1])


@api_view(['GET'])
def get_group_posts(request, id):
    pass


@api_view(['POST'])
def like_post(request, username, id):
    user = User.objects.get(username=username)
    post = Post.objects.get(id=id)
    new_like = PostLike(user=user, post=post)
    new_like.save() # add record to PostLike table
    post.likes += 1
    post.save() # update post with increased likes number
    return Response({f"post {id} liked by": f" user {request.user}"})


@api_view(['DELETE'])
def unlike_post(request, username, id):
    user = User.objects.get(username=username)
    post = Post.objects.get(id=id)
    unlike = PostLike.objects.get(user=user, post=post)
    unlike.delete() # remove record from PostLike table
    post.likes -= 1
    post.save() # update post with decreased likes number
    return Response({f"post {id} unliked by": f" user {request.user}"})


@api_view(['GET'])
def is_liked(request, username, id):
    try:
        user = User.objects.get(username=username)
        post = Post.objects.get(id=id)
        PostLike.objects.get(user=user, post=post)
        return Response({"liked": "yes"})
    except PostLike.DoesNotExist: # not liked == no record in DB
        return Response({"liked": "no"})


@api_view(['GET'])
def get_comments(request, id):
    comments = Comment.objects.filter(post=id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data[::-1])


@api_view(['GET'])
def get_replies(request, id):
    pass
