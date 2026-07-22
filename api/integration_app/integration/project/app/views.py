from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from app.serializers import *
from app.models import Student


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()