from django.db import models

# Create your models here.

class TimeStampMOdel(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class Meta:
        abstract = True
    
class Student(TimeStampMOdel):
    Name = models.CharField(max_length = 100)
    age = models.IntegerField()

class Teacher(TimeStampMOdel):
    name = models.CharField(max_length = 100)
    subject = models.CharField(max_length = 100)

class Person(models.Model):
    Name = models.CharField(max_length = 100)
    Age = models.IntegerField()
    Address = models.CharField(max_length = 100)

    def __str__(self):
        return self.Name

class ClassTeacher(Person):
    subject = models.CharField(max_length = 100)

class ClassStudent(Person):
    course = models.CharField(max_length = 100)