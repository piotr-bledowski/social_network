from rest_framework.response import Response
from .models import Group
from .serializers import GroupMemberSerializer

# helper functions and stuff to help avoid making views.py one giant behemoth of a file, which it is nonetheless, but like, I'm trying

def add_member(user, group):
    # Create new membership record
    new_member = GroupMemberSerializer(data={'user': user, 'group': group})
    if new_member.is_valid():
        new_member.save()

        # Increment group's member count
        group = Group(name=group)
        group.members += 1
        group.save()
        
        return Response('Joined group successfully')
    return Response('Something went wrong while trying to join the group')