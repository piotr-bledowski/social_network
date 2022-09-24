from audioop import reverse
from urllib.request import Request
from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response

from .helpers import API_DESCRIPTION, add_member, get_friends_private_posts, get_groups_private_posts, get_public_posts, get_users_friends, get_users_group_names, get_users_own_posts

from .models import Friend, FriendRequest, Group, GroupMember, ProfilePicture, User, Post, Comment, Reply, PostLike, CommentLike, ReplyLike
from .serializers import FriendRequestSerializer, FriendSerializer, GroupMemberSerializer, GroupSerializer, PostLikeSerializer, CommentLikeSerializer, ProfilePictureSerializer, ReplyLikeSerializer, PostSerializer, CommentSerializer, ReplySerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.db.models import Q

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
    return Response(API_DESCRIPTION)


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
    posts = get_users_own_posts(username)
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

        add_member(data['creator'], data['name'])
        
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
    return add_member(username, group_name)


@api_view(['DELETE'])
def leave_group(request, username, group_name):
    # Decrement group's member count
    group = Group.objects.get(name=group_name)
    group.members -= 1
    group.save()

    # Find and delete membership record
    record = GroupMember.objects.get(user=username, group=group_name)
    record.delete()
    return Response('Left group successfully')


@api_view(['GET'])
def is_member(request, username, group_name):
    try:
        member = GroupMember.objects.get(user=username, group=group_name)
        return Response({'member': 'yes'})
    except GroupMember.DoesNotExist:
        return Response({'member': 'no'})


@api_view(['GET'])
def get_friend_requests(request, username):
    requests = FriendRequest.objects.filter(receiver=username)
    serializer = FriendRequestSerializer(requests, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_friend_request(request, sender, receiver):
    try:
        friend_request = FriendRequest.objects.get(sender=sender, receiver=receiver)
        serializer = FriendRequestSerializer(friend_request)
        return Response(serializer.data)
    except FriendRequest.DoesNotExist:
        return Response('no')


@api_view(['POST'])
def send_friend_request(request, sender, receiver):
    serializer = FriendRequestSerializer(data={'sender': sender, 'receiver': receiver})
    if serializer.is_valid():
        serializer.save()
        return Response(f'Friend request sent to {receiver}')
    return Response('Something went wrong while sending the friend request')


@api_view(['DELETE'])
def cancel_friend_request(request, request_id):
    request_to_cancel = FriendRequest.objects.get(id=request_id)
    request_to_cancel.delete()
    return Response(f'Friend request {request_id} cancelled successfully')


@api_view(['POST'])
def accept_friend_request(request, request_id):
    friend_request = FriendRequest.objects.get(id=request_id)
    friend_request_serializer = FriendRequestSerializer(friend_request)
    data = friend_request_serializer.data
    serializer = FriendSerializer(data={'user1': data['sender'], 'user2': data['receiver']})
    if serializer.is_valid():
        serializer.save()
        friend_request.delete()
        return Response('Friend request accepted')
    return Response('Something went wrong while accepting the friend request')


@api_view(['DELETE'])
def unfriend(request, friendship_id):
    friendship = Friend.objects.get(id=friendship_id)
    friendship.delete()
    return Response('Unfriended')


@api_view(['GET'])
def is_friend(request, user1, user2):
    try:
        friend = Friend.objects.get(Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1)) # this is how Django does OR queries
        serializer = FriendSerializer(friend)
        return Response(serializer.data)
    except Friend.DoesNotExist:
        return Response('no')


@api_view(['GET'])
def get_feed(request, username):
    # get data for fetching posts
    group_names = get_users_group_names(username)
    friends = get_users_friends(username)

    # fetch all parts of feed
    public_posts = get_public_posts()
    group_posts = get_groups_private_posts(group_names)
    friends_posts = get_friends_private_posts(friends)
    own_posts = list(get_users_own_posts(username))

    # put it all together
    posts = public_posts + group_posts + friends_posts + own_posts
    posts.sort(key=lambda post: post.date, reverse=True)

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search(request, username, type, phrase):
    if type == 'all':
        return
    elif type == 'posts':
        return
    elif type == 'groups':
        return
    elif type == 'users':
        return
    else:
        raise Exception