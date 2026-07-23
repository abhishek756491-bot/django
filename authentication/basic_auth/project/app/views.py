from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser

class MovieViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = movieModel.objects.all()
    serializer_class = movieSerializer

    
class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# isauthenticated bale me check karega ki user login kia hai ya nhi age login hoga toh api access kar payega
# isadminuser bale me check karega ki user admin hai ya nhi aur check ke liye is_staff=True hona compulsory hoga toh api access kar payega
# django built in  is_staff=true jab ham superuser create krte h tabhi le leta h 
# if we want to assign the permission manually the addminuser toh uske liye use krte h admin panel ka admin per regiater karke baha jake is_staff true karni padegA