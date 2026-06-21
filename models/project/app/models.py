from django.db import models

# Create your models here.

class Student(models.Model):
    Name = models.CharField(max_length=100)
    Email = models.EmailField()
    Roll = models.IntegerField()
    City = models.CharField(max_length=100)
    Contact = models.IntegerField(max_length=10)

class Teacher(models.Model):
    Name = models.CharField(max_length=15)
    Name = models.CharField(max_length=15)
    Age =  models.IntegerField(max_length = 2)
    Degignation = models.CharField(max_length = 50)

