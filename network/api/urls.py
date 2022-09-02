from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.index),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create_post/', views.create_post),
    path('get_all_posts/', views.get_all_posts),
    path('get_post/<int:id>', views.get_post),
    path('edit_post/<int:id>', views.edit_post),
    path('get_public_posts/', views.get_public_posts),
    path('get_users_posts/<str:username>', views.get_users_posts),
    path('get_group_posts/<int:id>', views.get_group_posts),
]
