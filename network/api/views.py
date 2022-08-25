from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view
def create_post(request):
    pass


@api_view
def get_post(request, post_id):
    pass


@api_view
def edit_post(request, post_id):
    pass


@api_view
def get_public_posts(request):
    pass


@api_view
def get_group_posts(request, group_id):
    pass
