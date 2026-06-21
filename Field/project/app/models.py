from django.db import models

# Create your models here.
class Student(models.Model):
    Name = models.CharField(max_length=15,verbose_name='stu_name')
    Discription = models.TextField()
    # number field

    Age = models.IntegerField()
    price = models.FloatField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    create_at = models.DateTimeField(auto_now_add = True,null=True)
    updated_at = models.DateTimeField(auto_now = True ,null=True)
    dob = models.DateField(null=True)

    is_active = models.BooleanField(default=True ,null=True)
# Special Fields
    email = models.EmailField(unique=True ,null=True)
    website = models.URLField(null=True)
    slug = models.SlugField(null=True)

    def __str__(self):
        return self.Name

    class Meta:
        verbose_name_plural= 'student'
        ordering = ['Name']  #order the name abcd
        
        db_table = 'student_data' #change the database table name
        verbose_name = "student" 