from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

@api_view(["POST"])
def admin_login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username,password=password)

    if user is not None and user.is_staff:
        return Response(
        {
            "success" : True,
            "messege" : "Login Successful",
            "username" : username,
        },
        status = 200
        )
    return Response(
        {
            "success" : False,
            "messege" : "Invalid credentials",
        },
        status = 401
    )


@api_view(["POST"])
def add_category(request):
    name = request.data.get("name")
    status = request.data.get("status","1")

    True if str(status) == "1" else False
    category =Category.objects.create(name=name,is_active=is_active)
    serializer = CategorySerializer(category)
    
    return Response(
        {
            "success" : True,
            "messege" : "Category has been created",
            "category" : serializer.data,
        },
    status = 201
    )