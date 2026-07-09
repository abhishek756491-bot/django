from django.shortcuts import render,redirect
from .models import Registration
def home(request):
    return render(request,"home.html")
# Create your views here.
def registration(request):
    if request.method == "POST":
        fullname = request.POST.get("fullname")
        email = request.POST.get("email")
        username = request.POST.get("username")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        Registration.objects.create(
            fullname = fullname,
            email=email,
            username=username,
            password=password,
            confirm_password=confirm_password
        )

        return redirect("home")

    return render(request,"registration.html")