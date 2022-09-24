from rest_framework.response import Response
from .models import Friend, Group, Post, GroupMember
from .serializers import GroupMemberSerializer

# helper functions and stuff to help avoid making views.py one giant behemoth of a file, which it is nonetheless, but like, I'm trying

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

def get_public_posts():
    return list(Post.objects.filter(public=True))

def get_users_group_names(user):
    groups = GroupMember.objects.filter(user=user)
    serializer = GroupMemberSerializer(groups, many=True)
    return map(lambda x: x['group'], serializer.data)

def get_groups_private_posts(groups):
    return list(Post.objects.filter(public=False, group__in=groups))

def get_users_friends(user):
    friends1 = Friend.objects.filter(user1=user)
    friends2 = Friend.objects.filter(user2=user)
    return [friend.user2 for friend in friends1] + [friend.user1 for friend in friends2]

def get_friends_private_posts(friends):
    return list(Post.objects.filter(public=False, author__in=friends, group=None))