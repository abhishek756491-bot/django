from django.shortcuts import render

# Create your views here.
def registration(request):
    students=registration.objects.all()
    return render(request,'registration.html',{'key' : students})