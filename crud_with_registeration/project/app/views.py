from django.shortcuts import render
from app.forms import RegistrationForm,LoginForm
from app.models import StudentModel

# Create your views here.
def home(request):
    form=RegistrationForm()
    if request.method=="POST":      
        form=RegistrationForm(request.POST)
    
        if form.is_valid():
            stu_name=form.cleaned_data["stu_name"]
            stu_email=form.cleaned_data["stu_email"]
            stu_city=form.cleaned_data["stu_city"]
            stu_mobile=form.cleaned_data["stu_mobile"]
            stu_password=form.cleaned_data["stu_password"]
            print(stu_name,stu_email,stu_city,stu_mobile)
            user = StudentModel.objects.filter(stu_email=stu_email)
            if user:
                msg = "Email already exist"
                form = RegistrationForm()
                return render(request,"home.html",{"form":form,"msg":msg})
            else:
                form.save()
                msg="Registration succesfull"
                form=RegistrationForm()
                return render(request,"home.html",{"form":form,"msg":msg})
            
    else:
        return render(request,'home.html',{"form":form})

def login(request):
    form = LoginForm()
    if request.method == "POST":
        data = LoginForm(request.POST)
        if data.is_valid():
            email = data.cleaned_data["stu_email"]
            password = data.cleaned_data["stu_password"]
            user = StudentModel.objects.filter(stu_email=email)

            if user:
                user = StudentModel.objects.get(stu_email=email)
                if user.stu_password == password:
                    name = user.stu_name
                    email = user.stu_email
                    contact = user.stu_mobile
                    city = user.stu_city
                    password = user.stu_password
                    data = {
                        "name": name,
                        "email": email,
                        "contact": contact,
                        "city": city,
                        "password": password
                    }

                    return render(request,'dashboard.html',{'data':data})
                else:
                    msg = "farzi aadmi"
                    return render(request,'login.html',{'form':form,'msg':msg})
            else:
                msg = "email not registered"
                return render(request,'login.html',{'form':form,'msg':msg})
    else:
        return render(request,'login.html',{'form':form})
    