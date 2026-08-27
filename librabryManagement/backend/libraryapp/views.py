from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status


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

    is_active = True if str(status) == "1" else False
    category = Category.objects.create(name=name,is_active=is_active)
    serializer = CategorySerializer(category)
    
    return Response(
        {
            "success" : True,
            "message" : "Category has been created",
            "category" : serializer.data,
        },
    status = 201
    )

@api_view(["GET"])
def list_categories(request):
    categories = Category.objects.all().order_by("-id")

    serializer = CategorySerializer(categories,many=True)
    
    return Response(serializer.data, status = status.HTTP_200_OK)

from django.shortcuts import get_object_or_404
@api_view(["PUT"])
def update_category(request,id):
    category = get_object_or_404(Category,id=id)
    name = request.data.get("name")
    category_status = request.data.get("status","1")
    
    is_active = True if str(category_status) == "1" else False
    category.name = name
    category.is_active = is_active
    category.save()
    serializer = CategorySerializer(category)

    return Response(
        {
            "success" : True,
            "message" : "Category has been updated",
            "category" : serializer.data,
        },
        status = status.HTTP_200_OK
    )

@api_view(["DELETE"])
def delete_category(request,id):
    category = get_object_or_404(Category,id=id)
    
    category.delete()
    
    return Response(
        {
            "success" : True,
            "message" : "Category deleted has been successfully",
        },
        status = status.HTTP_200_OK
    )

@api_view(["POST"])
def add_author(request):
    name = request.data.get("name")
    
    author = Author.objects.create(name=name)
    serializer = AuthorSerializer(author)
    
    return Response(
        {
            "success" : True,
            "message" : "Author has been created",
            "author" : serializer.data,
        },
       status = status.HTTP_201_CREATED
    )

@api_view(["GET"])
def list_authors(request):
    authors = Author.objects.all().order_by("-id")

    serializer = AuthorSerializer(authors,many=True)

    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(["PUT"])
def update_author(request,id):
    author = get_object_or_404(Author,id=id)
    name = request.data.get("name")

    author.name = name
    author.save()
    serializer = AuthorSerializer(author)

    return Response(
        {
            "success" : True,
            "message" : "Author has been updated",
            "author" : serializer.data
        }
    )

@api_view(["DELETE"])
def delete_author(request,id):
    author = get_object_or_404(Author,id=id)
    author.delete()

    return Response(
        {
            "success" : True,
            "message" : "Author deleted successfully"
        },
        status = status.HTTP_200_OK
    )

from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def add_book(request):
    title = request.data.get("title")
    author_id = request.data.get("author")
    category_id = request.data.get("category")
    isbn = request.data.get("isbn")
    price = request.data.get("price")
    quantity = request.data.get("quantity")
    cover_image = request.FILES.get("cover_image")

    author = Author.objects.get(id=author_id)
    category = Category.objects.get(id=category_id)

    if Book.objects.filter(isbn=isbn).exists():
        return Response(
            {
                "success": False,
                "message": "Book with this ISBN already exists",
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    book = Book.objects.create(
        title=title,
        author=author,
        category=category,
        isbn=isbn,
        price=price,
        quantity=quantity,
        cover_image=cover_image
    )

    serializer = BookSerializer(book)

    return Response(
        {
            "success": True,
            "message": "Book has been created",
            "book": serializer.data,
        },
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
def list_books(request):
    books = Book.objects.all().order_by("-id")

    serializer = BookSerializer(books,many=True)

    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(["PUT"])
@parser_classes([MultiPartParser, FormParser])
def update_book(request,id):
    book = get_object_or_404(Book,id=id)
    title = request.data.get("title")
    author_id = request.data.get("author")
    category_id = request.data.get("category")
    price = request.data.get("price")
    quantity = request.data.get("quantity")
    cover_image = request.FILES.get("cover_image")

    author = Author.objects.get(id=author_id)
    category = Category.objects.get(id=category_id)

    book.title = title
    book.author = author
    book.category = category
    book.price = price
    book.quantity = quantity

    if cover_image:
        book.cover_image = cover_image

    book.save()
    serializer = BookSerializer(book)

    return Response(
        {
            "success": True,
            "message": "Book has been updated",
            "book": serializer.data,
        },
        status=status.HTTP_200_OK
    )

@api_view(["DELETE"])
def delete_book(request,id):
    book = get_object_or_404(Book,id=id)
    book.delete()

    return Response(
        {
            "success": True,
            "message": "Book deleted successfully"
        },
        status = status.HTTP_200_OK
    )

from django.contrib.auth.models import User

@api_view(["POST"])
def change_admin_password(request):
    username = request.data.get("username")
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    confirm_password = request.data.get("confirm_password")
    
    if new_password != confirm_password:
        return Response(
            {
                "success": False,
                "message": "New password and confirm password do not match"
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(new_password) < 6:
        return Response(
            {
                "success": False,
                "message": "New password must be at least 6 characters long"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=current_password)

    try:
        user = User.objects.get(username=username,is_staff=True)
    except User.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "Admin user does not exist"
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    if user.check_password(current_password):
        user.set_password(new_password)
        user.save()
        return Response(
            {
                "success": True,
                "message": "Password changed successfully"
            },
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {
                "success": False,
                "message": "Invalid current password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


from django.contrib.auth.hashers import make_password

@api_view(["POST"])
def user_signup(request):
    full_name = request.data.get("full_name")
    mobile = request.data.get("mobile")
    email = request.data.get("email")
    password = request.data.get("password")
    confirmPassword = request.data.get("confirmPassword")

    if password != confirmPassword:
        return Response(
            {
                "success" : False,
                "message" : "password do not match",
            },
            status = status.HTTP_400_BAD_REQUEST
        )
    
    if len(password) < 6:
        return Response(
            {
                "success": False,
                "message": "New password must be at least 6 characters long"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    last_student = Student.objects.all().order_by().first()
    if last_student and last_student.student_id.isdigit():
        new_id_int = int(last_student.student_id) + 1

    else:
        new_id_int = 1001

    student_id = str(new_id_int)

    if Student.objects.filter(email=email).exists():
        return Response(
            {
                "success" : False,
                "message" : "Email already axist"
            },
            status = status.HTTP_400_BAD_REQUEST
        )
        
    hashed_password = make_password(password)

    student = Student.objects.create(
        student_id = student_id,
        full_name = full_name,
        mobile = mobile,
        email = email,
        password = hashed_password,
        is_active = True
    )

    return Response(
        {
            "success" : True,
            "message" : "User registered successfully",
            "student_id" : student.student_id,
            "student_name" : student.full_name,
        },
        status = status.HTTP_201_CREATED
    )


from django.contrib.auth.hashers import check_password
@api_view(["POST"])
def user_login(request):
    login_id = request.data.get("login_id")
    password = request.data.get("password")
     
    try:
        if "@" in login_id:
            student = Student.objects.get(email=login_id)
        else:
            student = Student.objects.get(student_id=login_id)

    except Student.DoesNotExists:
        return Response(
            {
                "success" : False,
                "message" : "Inivalid login crendentials"
            },
            status = status.HTTP_401_UNAUTHORIZED
        )

    if not check_password(password, student.password):
        return Response(
            {
                "success" : False,
                "messege" :"invalid login credentials"
            },
            status = status.HTTP_401_UNAUTHORIZED
        )
    
    if not student.is_active:
        return Response(
            {
            "success" : False,
            "messege" : "User account is inactive, please contact admin"
            },
            status =  status.HTTP_403_FORBIDDEN
        )
    
    return Response(
        {
            "success" : True,
            "messege" : "Login successfull",
            "student_id" : student.student_id,
            "full_name" : student.full_name,
            "email" : student.email,
        },
        status = status.HTTP_200_OK
    )
