from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse


def   home(request):
    return HttpResponse("abhishek")

def about(request):
    return HttpResponse("aman")

def service(request):
    return redirect("https://www.google.com/search?q=chrome&rlz=1C1VDKB_enIN1103IN1103&oq=chrom&gs_lcrp=EgZjaHJvbWUqDwgAEEUYOxixAxiABBjHBTIPCAAQRRg7GLEDGIAEGMcFMgYIARBFGDkyDQgCEAAYsQMYgAQYxwUyDQgDEAAYsQMYgAQYxwUyBggEEAUYQDIGCAUQBRhAMgYIBhAFGEAyBggHEAUYQNIBCDE0NjFqMGo3qAIIsAIB8QUZ85TzbYzR_PEFGfOU822M0fw&sourceid=chrome&ie=UTF-8")

def product(request):
    data=[
        {'name':'abhishek'},
        {'name':'abhi'}
    ]
    return render(request,'product.html',{'keys':data})

def contact(request):
    data=[
        {'name':'abhishek'},
        {'name':'abhi'}
    ]
    return JsonResponse(data,safe=False)

def abhi(request,pk):
    data = pk 
    return render (request,'home.html',{'key':data})

def abhishek(request,pk):
    data = pk 
    return render (request,'about.html',{'key':data})

def nitish(request,pk):
    data = pk
    return render(request,'about.html',{'key':data})

def comb(request,pk,ab,abc):
    data = [{'data':pk,
             'data1':ab,
             'data2':abc,
    }]
    return render(request,'about.html',{'key':data})
# Create your views here.
