from django.db import models


# Create your models here.
class StudentModel(models.Model):
    stu_name = models.CharField()
    stu_email = models.EmailField()
    stu_mobile = models.IntegerField()
    stu_city = models.CharField()
    stu_password = models.CharField()
