from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class movieSerializer(serializers.ModelSerializer):
     class Meta:
        model = movieModel
        fields = '__all__'