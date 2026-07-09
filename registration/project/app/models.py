from django.db import models

# Create your models here.

class Registration(models.Model):
    fullname = models.CharField()
    email = models.EmailField()
    username = models.CharField()
    password = models.CharField()
    confirm_password = models.CharField()

    def __str__(self):
        return self.fullname

