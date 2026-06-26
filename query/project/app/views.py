from django.shortcuts import render
from app.models import *
# Create your views here.

def home(request):
    students=Student.objects.all() #return the all data
    print(students)

    filter=Student.objects.filter(city='muzaffarpur') #return the data which is having the city name muzaffar
    print(filter)

    exclude=Student.objects.exclude(city='muzaffarpur') # remove the data who having the city bhopal
    print(exclude)

    sorting=Student.objects.order_by('name') # ascending order
    print(" sorting = ",sorting)

    sortingD=Student.objects.order_by('-name') # decending order
    print("sortingD = ",sortingD)

    dict=Student.objects.values() #give the data in dict formate
    print("dict = ",dict)

    dictSpecific=Student.objects.values('name','city') #give the data of spacific fields
    print("dictSpecific = ",dictSpecific)

    tuple=Student.objects.values_list() #tupple formate
    print("tuple = ",tuple)
    