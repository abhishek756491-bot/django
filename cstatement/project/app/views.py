from django.shortcuts import render
from datetime import datetime
# Create your views here.
def home(request):
    data = {
        'age':20
    }
    return render(request,'home.html',data)

def about(request):
    data = {
        "title":"My second Templates Post",
        "Descriptions":"Django is a high-level Python web framework",
        "author": None ,
        "created_at":datetime(2025,8,12,10,30),
        "comments_count":5,
        "tags": ["Django","python","web Development"],
        "price" :100,
        "number" : 7,
    }
    return render (request,'about.html',data)