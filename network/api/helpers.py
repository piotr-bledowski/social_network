from rest_framework.response import Response
from .models import Friend, Group, Post, GroupMember, User
from .serializers import GroupMemberSerializer
from django.db.models import Q

# helper functions and stuff to help avoid making views.py one giant behemoth of a file, which it is nonetheless, but like, I'm trying

API_DESCRIPTION = {
        "Create new post": '/create_post/',
        "Get a specific post": '/get_post/<int:post_id>',
        "Edit a specific post": '/edit_post/<int:post_id>',
        "Get all posts": '/get_all_posts/',
        "Get user's posts": '/get_users_posts/<str:username>',
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
        "Join group": '/join_group/<str:username>/<str:group_name>',
        "Leave group": '/leave_group/<str:username>/<str:group_name>',
        "Check if user is a member of a group": '/is_member/<str:username>/<str:group_name>',
        "Get friend requests": '/get_friend_requests/<str:username>',
        "Get friend request (check if it exists)": '/get_friend_request/<str:sender>/<str:receiver>',
        "Send friend request": '/send_friend_request/<str:sender>/<str:receiver>',
        "Cancel friend request as the sender (or reject as the receiver, same thing)": '/cancel_friend_request/<int:request_id>',
        "Accept friend request": '/accept_friend_request/<int:request_id>',
        "Remove from friends": '/unfriend/<int:friendship_id>',
        "Check if friendship exists": '/is_friend/<str:user1>/<str:user2>',
        "Get user's feed (all posts on the home page)" : '/get_feed/<str:username>',
        "Search": '/search/<str:username>/<str:type>/<str:phrase>',
    }


def add_member(user, group):
    # Create new membership record
    new_member = GroupMemberSerializer(data={'user': user, 'group': group})
    if new_member.is_valid():
        new_member.save()

        # Increment group's member count
        group = Group.objects.get(name=group)
        group.members += 1
        group.save()
        
        return Response('Joined group successfully')
    return Response('Something went wrong while trying to join the group')


def get_users_own_posts(user):
    user = User.objects.get(username=user)
    return Post.objects.filter(author=user)


def get_public_posts():
    return Post.objects.filter(public=True)


def get_users_group_names(user):
    groups = GroupMember.objects.filter(user=user)
    serializer = GroupMemberSerializer(groups, many=True)
    return map(lambda x: x['group'], serializer.data)


def get_groups_private_posts(groups):
    return Post.objects.filter(public=False, group__in=groups)


def get_users_friends(user):
    friends1 = Friend.objects.filter(user1=user)
    friends2 = Friend.objects.filter(user2=user)
    return [friend.user2 for friend in friends1] + [friend.user1 for friend in friends2]


def get_friends_private_posts(friends):
    return Post.objects.filter(public=False, author__in=friends, group=None)


def search_posts(user, phrase):
    friends = get_users_friends(user)
    groups = get_users_group_names(user)
    public_posts = get_public_posts()
    friends_posts = get_friends_private_posts(friends)
    group_posts = get_groups_private_posts(groups)
    own_posts = get_users_own_posts(user)

    public_posts_filtered = public_posts.filter(Q(title__icontains=phrase) | Q(text__icontains=phrase))
    friends_posts_filtered = friends_posts.filter(Q(title__icontains=phrase) | Q(text__icontains=phrase))
    group_posts_filtered = group_posts.filter(Q(title__icontains=phrase) | Q(text__icontains=phrase))
    own_posts_filtered = own_posts.filter(Q(title__icontains=phrase) | Q(text__icontains=phrase))

    return list(public_posts_filtered) + list(friends_posts_filtered) + list(group_posts_filtered) + list(own_posts_filtered)


def search_groups(phrase):
    return


def search_users(phrase):
    pass