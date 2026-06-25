from django.shortcuts import render


def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

def advance(request):
    students_list=[
        {"name":"Abhi","class":"10th"},
        {"name":"Pankaj","class":"9th"},
        {"name":"aman","class":"8th"},
    ]
    return render(request,'advance.html',{'students':students_list})
# Create your views here.

