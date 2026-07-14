from django.shortcuts import render
from django.http import HttpResponse
from app.forms import RegistrationForm,LoginForm,QueryForm
from app.models import PatientModel,PatientQuery
# Create your views here.

def base(request):
    return render(request,'base.html')

def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def doctor(request):
    return render(request,'doctor.html')


def services(request):
    return render(request,'services.html')

def Registration(request):
    form=RegistrationForm()
    if request.method=="POST":      
        form=RegistrationForm(request.POST)
    
        if form.is_valid():
            patient_name=form.cleaned_data["patient_name"]
            patient_email=form.cleaned_data["patient_email"]
            patient_city=form.cleaned_data["patient_city"]
            patient_mobile=form.cleaned_data["patient_mobile"]
            patient_password=form.cleaned_data["patient_password"]
            print(patient_name,patient_email,patient_city,patient_mobile)
            user = PatientModel.objects.filter(patient_email=patient_email)
            if user:
                msg = "Email already exist"
                form = RegistrationForm()
                return render(request,"Registration.html",{"form":form,"msg":msg})
            else:
                form.save()
                msg="Registration succesfull"
                form=RegistrationForm()
                return render(request,"Registration.html",{"form":form,"msg":msg})
            
    else:
        return render(request,'Registration.html',{"form":form})

#---- login -----------
def login(request):
    form = LoginForm()
    if request.method == "POST":
        data = LoginForm(request.POST)
        if data.is_valid():
            email = data.cleaned_data["patient_email"]
            password = data.cleaned_data["patient_password"]
            user = PatientModel.objects.filter(patient_email=email)

            if user:
                user = PatientModel.objects.get(patient_email=email)
                if user.patient_password == password:
                    name = user.patient_name
                    email = user.patient_email
                    contact = user.patient_mobile
                    city = user.patient_city
                    password = user.patient_password
                    data = {
                        "name": name,
                        "email": email,
                        "contact": contact,
                        "city": city,
                        "password": password
                    }
                    initial_data={
                        'patient_name':name,
                        'patient_email':email,
                    }
                    form1 = QueryForm(initial=initial_data)
                    data1 = PatientQuery.objects.filter(patient_email=email)
                    return render(request,'query.html',{'data':data,'query':form1,'data1':data1})
                else:
                    msg = "user not found"
                    return render(request,'login.html',{'form':form,'msg':msg})
            else:
                msg = "email not registered"
                return render(request,'login.html',{'form':form,'msg':msg})
    else:
        return render(request,'login.html',{'form':form})

def query(request):
    # return HttpResponse("hi.............")
    form = QueryForm()
    if request.method=="POST":
        query_data = QueryForm(request.POST) 
        # print(query_data)
        if query_data.is_valid():
            name =  query_data.cleaned_data['patient_name']
            email = query_data.cleaned_data['patient_email']
            query = query_data.cleaned_data['patient_query']
            # print(email,name,query)
            query_data.save()
            user = PatientModel.objects.get(patient_email=email)
            if user:
                name = user.patient_name
                email = user.patient_email
                contact = user.patient_mobile
                city = user.patient_city
                password = user.patient_password
                data = {
                    'name':name,
                    'email':email,
                    'contact':contact,
                    'city':city,
                    'password':password
                }
                initial_data = {
                                'patient_name': name,
                                'patient_email': email
                            } 
                form1=QueryForm(initial=initial_data)
                data1=PatientQuery.objects.filter(patient_email=email) #TABLE PER DATA SHOW KARNE KE LIYE              
                return render(request,'query.html',{'data':data,'query':form1,'data1':data1})

def edit(request,pk):
    print(pk)
    form=QueryForm()
    if request.method=="POST":
        user = PatientQuery.objects.get(id=pk)
        name = user.patient_name
        email = user.patient_email
        query=user.patient_query
        id=pk
       
        initial_data = {
                        'patient_name': name,
                        'patient_email': email,
                        'patient_query': query
                    } 
        form1=QueryForm(initial=initial_data)
        data1 = PatientQuery.objects.filter(patient_email=email)
        user1 = PatientModel.objects.get(patient_email=email)
        name = user1.patient_name
        email = user1.patient_email
        contact = user1.patient_mobile
        city = user1.patient_city
        password = user1.patient_password
        
        data = {
                    'name':name,
                    'email':email,
                    'contact':contact,
                    'city':city,
                    'password':password
                }
        return render(request,'query.html',{'data':data,'form1':form1,'data1':data1,'pk':pk})

def update(request,pk):
    print(pk)
    form = QueryForm()
    if request.method=="POST":
        old_data=PatientQuery.objects.get(id=pk)
        query_data = QueryForm(request.POST,instance=old_data) 
        # print(query_data)
        if query_data.is_valid():
            name =  query_data.cleaned_data['patient_name']
            email = query_data.cleaned_data['patient_email']
            query = query_data.cleaned_data['patient_query']
            # print(email,name,query)
            query_data.save()
            user = PatientModel.objects.get(patient_email=email)
            if user:
                name = user.patient_name
                email = user.patient_email
                contact = user.patient_mobile
                city = user.patient_city
                password = user.patient_password
                data = {
                    'name':name,
                    'email':email,
                    'contact':contact,
                    'city':city,
                    'password':password
                }
                initial_data = {
                                'stu_name': name,
                                'stu_email': email
                            } 
                form1=QueryForm(initial=initial_data)
                data1=PatientQuery.objects.filter(patient_email=email) #TABLE PER DATA SHOW KARNE KE LIYE              
                return render(request,'query.html',{'data':data,'query':form1,'data1':data1})

def delete(request,pk):
    form=QueryForm()
    if request.method=="POST":
        user = PatientQuery.objects.get(id=pk)
        name = user.patient_name
        email = user.patient_email
        user.delete()
        initial_data = {
            'patient_name' :name,
            'patient_email' :email
        }
        form1 = QueryForm(initial=initial_data)
        data1 = PatientQuery.objects.filter(patient_email=email)
        user1 = PatientModel.objects.get(patient_email=email)
        name = user1.patient_name
        email = user1.patient_email
        contact = user1.patient_mobile
        city = user1.patient_city
        password = user1.patient_password


        data = {
            'name': name,
            'email' : email,
            'contact' : contact,
            'city' : city,
            'password' : password
        }
        return render(request,'query.html',{'data':data,'query':form1,'data1':data1})

