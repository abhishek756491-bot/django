from django.shortcuts import render

from app.models import *
from django.contrib.auth.models import User
from app.serializers import StudentSerializer
from rest_framework import generics,mixins


class StudentAPI(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self,request,*args,**kwargs):   #args inside this the list is come Kwargs inside this the dict come in key value pair ===
        return self.list(request,*args,**kwargs)
  
    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)  
    

class StudentDetailAPI(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)

    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)