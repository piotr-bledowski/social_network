from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('create_post/', views.create_post),
    path('get_all_posts/', views.get_all_posts),
    path('get_post/<int:id>', views.get_post),
    path('edit_post/<int:id>', views.edit_post),
    path('get_public_posts/', views.get_public_posts),
    path('get_group_posts/<int:id>', views.get_group_posts),
]
