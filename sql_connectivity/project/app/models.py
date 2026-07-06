from django.db import models

# Create your models here.
class Students(models.Model):
    name = models.CharField(max_length=100)
    email= models.EmailField()
    age = models.IntegerField()   
    address = models.TextField()
    contact = models.IntegerField(max_length = 11)

    Images = models.ImageField(null=True,upload_to='images/')
    file = models.FileField(null=True,upload_to='files/' )
    
    def __str__(self):
        return self.name