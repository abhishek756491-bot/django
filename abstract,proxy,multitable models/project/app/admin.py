from django.contrib import admin

# Register your models here.
from app.models import *

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Person)
admin.site.register(ClassTeacher)
admin.site.register(ClassStudent)
