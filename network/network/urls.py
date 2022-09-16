"""network URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from social_network import views
from django.conf.urls.static import static
from .settings import MEDIA_ROOT, MEDIA_URL

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('social_network.urls')),
    path('api/', include('api.urls')),
    re_path(r'^(?:.*)/?$', views.index), # the funny regex catches all React Router URLs, otherwise Django would throw an error
    # ! this is basically the same as above, BUT using path instead of re_path allows media to be served, however it does not allow React Routes, so both are needed
    path(r'^(?:.*)/?$', views.index),
]

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)