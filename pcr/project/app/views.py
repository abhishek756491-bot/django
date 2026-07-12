from django.shortcuts import render
from app.forms import RegistrationForm
from app.models import StudentModel

# Create your views here.
def home(request):
    form = RegistrationForm()
    if request.method=='POST':
        form = RegistrationForm(request.POST)

        if form.is_valid():
            stu_name = form.cleaned_data["stu_name"]
            stu_email = form.cleaned_data["stu_email"]
            stu_mobile = form.cleaned_data["stu_mobile"]
            stu_city = form.cleaned_data["stu_city"]
            stu_password = form.cleaned_data["stu_password"]
            user = StudentModel.objects.filter(stu_email = stu_email)

            if  user:
                msg = "Email already exists"
                form=RegistrationForm()
                return render(request,"home.html",{"form" : form,"msg":msg})
            else:
                form.save()
                msg="Registration successful"
                form=RegistrationForm()
                return render (request,"home.html",{"form" : form,"msg":msg})

    else:
        return render(request,'home.html',{"form":form})