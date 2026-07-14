"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name='home'),
    path('base',views.base,name='base'),
    path('about',views.about,name='about'),
    path('services',views.services,name='services'),
    path('doctor',views.doctor,name='doctor'),
    path('Registration',views.Registration,name='Registration'),
    path('login',views.login,name='login'),
    path('query/',views.query,name='query'),
    path('edit/<int:pk>/',views.edit,name='edit'),
    path('update/<int:pk>/',views.update,name='update'),
    path('delete/<int:pk>/',views.delete,name='delete')
]