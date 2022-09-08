from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post, Comment, Reply, PostLike, CommentLike, ReplyLike
from .serializers import PostLikeSerializer, CommentLikeSerializer, ReplyLikeSerializer, PostSerializer, CommentSerializer, ReplySerializer, PostSerializerCreate
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
        "Like (a post, comment or a reply to a comment)": "/like/<str:type>/<str:username>/<int:id>",
        "Unlike (a post, comment or a reply to a comment)": "/unlike/<str:type>/<str:username>/<int:id>",
        "Is this (post, comment, reply) liked by current user?": "/is_liked/<str:type>/<str:username>/<int:id>",
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
def like(request, type, username, id):
    if type == 'post':
        element = Post.objects.get(id=id)
        new_like = PostLikeSerializer(data={'user': username, 'post': id})
    elif type == 'comment':
        element = Comment.objects.get(id=id)
        new_like = CommentLike(data={'user': username, 'comment': id})
    elif type == 'reply':
        element = Comment.objects.get(id=id)
        new_like = CommentLike(data={'user': username, 'reply': id})
    else:
        raise Exception
    if new_like.is_valid():
        new_like.save() # add record to PostLike table
        element.likes += 1
        element.save() # update post with increased likes number
        return Response({f"post {id} liked by": f" user {request.user}"})
    return Response({'status': 'Something went wrong, big time'})


@api_view(['DELETE'])
def unlike(request, type, username, id):
    if type == 'post':
        element = Post.objects.get(id=id)
        unlike = PostLike.objects.get(user=username, post=id)
    elif type == 'comment':
        element = Comment.objects.get(id=id)
        unlike = CommentLike.objects.get(user=username, comment=id)
    elif type == 'reply':
        element = Reply.objects.get(id=id)
        unlike = ReplyLike.objects.get(user=username, reply=id)
    else:
        raise Exception
    unlike.delete() # remove record from PostLike table
    element.likes -= 1
    element.save() # update post with decreased likes number
    return Response({f"post {id} unliked by": f" user {request.user}"})
    #return Response({'status': 'Something went wrong, big time'})


@api_view(['GET'])
def is_liked(request, type, username, id):
    try:
        if type == 'post':
            PostLike.objects.get(user=username, post=id)
        elif type == 'comment':
            CommentLike.objects.get(user=username, comment=id)
        elif type == 'reply':
            ReplyLike.objects.get(user=username, reply=id)
        else:
            raise Exception
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
