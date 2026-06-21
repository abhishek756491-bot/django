from django.contrib import admin
from django.urls import path
from app.views import *   # myapp ki jagah apne app ka naam likho

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name='home'),
    path('about/', about, name='about'),
]