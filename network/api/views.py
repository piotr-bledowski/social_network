from urllib.request import Request
from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response

from .models import Group, GroupMember, ProfilePicture, User, Post, Comment, Reply, PostLike, CommentLike, ReplyLike
from .serializers import GroupMemberSerializer, GroupSerializer, PostLikeSerializer, CommentLikeSerializer, ProfilePictureSerializer, ReplyLikeSerializer, PostSerializer, CommentSerializer, ReplySerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

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
        "Get all public posts": '/get_public_posts/', # to delete later
        "Get group's posts": '/get_group_posts/<str:group_name>',
        "Like (a post, comment or a reply to a comment)": "/like/<str:type>/<str:username>/<int:id>",
        "Unlike (a post, comment or a reply to a comment)": "/unlike/<str:type>/<str:username>/<int:id>",
        "Is this (post, comment, reply) liked by current user?": "/is_liked/<str:type>/<str:username>/<int:id>",
        "Create new comment": '/create_comment/',
        "Get comments for a post": "/get_comments/<int:post_id>",
        "Create new reply": '/create_reply/',
        "Get replies for a comment": "/get_replies/<int:comment_id>",
        "Set profile picture": '/set_profile_pic/<str:username>',
        "Get profile picture": '/get_profile_pic/<str:username>',
        "Create group": '/create_group/',
        "Get group": '/get_group/<str:group_name>',
        "Upload group's picture": '/set_group_pic/<str:group_name>',
        "Get user's groups": '/get_users_groups/<str:username>',
        "Join group": 'join_group/<str:username>/<str:group_name>',
        "Leave group": 'leave_group/<str:username>/<str:group_name>',
    })


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser]) # these allow files to be parsed (not exactly JSON data)
def create_post(request):
    data = request.data.dict()
    for key in data.keys():
        if data[key] == 'null':
            data[key] = None
    serializer = PostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
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
    return Response(serializer.data[::-1])


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
def get_group_posts(request, group_name):
    posts = Post.objects.filter(group=group_name)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data[::-1])


@api_view(['POST'])
def like(request, type, username, id):
    if type == 'post':
        element = Post.objects.get(id=id)
        new_like = PostLikeSerializer(data={'user': username, 'post': id})
    elif type == 'comment':
        element = Comment.objects.get(id=id)
        new_like = CommentLikeSerializer(data={'user': username, 'comment': id})
    elif type == 'reply':
        element = Reply.objects.get(id=id)
        new_like = ReplyLikeSerializer(data={'user': username, 'reply': id})
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
    except (PostLike.DoesNotExist, CommentLike.DoesNotExist, ReplyLike.DoesNotExist): # not liked == no record in DB
        return Response({"liked": "no"})


@api_view(['POST'])
def create_comment(request):
    # incrementing post's comments counter
    post = Post.objects.get(id=request.data['post'])
    post.comments += 1
    post.save()

    # adding new comment to DB
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response('INVALID POST DATA')


@api_view(['GET'])
def get_comments(request, id):
    comments = Comment.objects.filter(post=id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_reply(request):
    # incrementing comment's replies counter
    comment = Comment.objects.get(id=request.data['comment'])
    comment.replies += 1
    comment.save()

    # adding new reply to DB
    serializer = ReplySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response('INVALID POST DATA')


@api_view(['GET'])
def get_replies(request, id):
    replies = Reply.objects.filter(comment=id)
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser]) # these allow files to be parsed (not exactly JSON data)
def set_profile_pic(request, username):
    data = request.data.dict()
    pic = ProfilePicture.objects.get(user=username)
    pic.picture = data['picture']
    pic.save()
    return Response('profile picture uploaded')



@api_view(['GET'])
def get_profile_pic(request, username):
    try:
        pic = ProfilePicture.objects.get(user=username)
        serializer = ProfilePictureSerializer(pic)
    # since User creation is handled by Django, we add the deafult profile pic when it needs to be displayed for the first time
    except ProfilePicture.DoesNotExist:
        serializer = ProfilePictureSerializer(data={'user': username})
        if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser]) # these allow files to be parsed (not exactly JSON data)
def create_group(request):
    # Now, here we can set the group's default pic on creation, since we actually control it, not some Django's default code
    # It's set automatically though, None means default pic being asigned
    data = request.data.dict()
    for key in data.keys():
        if data[key] == 'null':
            data[key] = None
    serializer = GroupSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data)
    return Response('INVALID POST DATA')


@api_view(['GET'])
def get_group(request, group_name):
    group = Group.objects.get(name=group_name)
    serializer = GroupSerializer(group)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser]) # these allow files to be parsed (not exactly JSON data)
def set_group_pic(request, group_name):
    data = request.data.dict()
    group = Group.objects.get(name=group_name)
    group.picture = data['picture']
    group.save()
    return Response('group picture uploaded')


@api_view(['GET'])
def get_users_groups(request, username):
    # get names of user's groups
    groups = GroupMember.objects.filter(user=username)
    serializer = GroupMemberSerializer(groups, many=True)
    group_names = map(lambda x: x['group'], serializer.data)

    # use the names to get full info on the groups
    groups = Group.objects.filter(name__in=group_names)
    seralizer = GroupSerializer(groups, many=True)
    return Response(seralizer.data)


@api_view(['POST'])
def join_group(request, username, group_name):
    # Create new membership record
    new_member = GroupMemberSerializer(data={'user': username, 'group': group_name})
    if new_member.is_valid():
        new_member.save()

        # Increment group's member count
        group = Group(name=group_name)
        group.members += 1
        group.save()
        
        return Response('Joined group successfully')
    return Response('Something went wrong while trying to join the group')


@api_view(['DELETE'])
def leave_group(request, username, group_name):
    # Decrement group's member count
    group = Group(name=group_name)
    group.members -= 1
    group.save()

    # Find and delete membership record
    record = GroupMember(user=username, group=group_name)
    record.delete()
    return Response('Left group successfully')