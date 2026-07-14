from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


# GET ALL + POST

@api_view(['GET', 'POST'])
def student_api(request):
    # GET DATA
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    
    # CREATE DATA
    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Student Added',
                'data': serializer.data

            })

        return Response(serializer.errors)
    

@api_view(['GET', 'PUT', 'DELETE'])
def student_detail(request, id):

    student = Student.objects.get(id=id)

    # SINGLE GET
    if request.method == 'GET':

        serializer = StudentSerializer(student)

        return Response(serializer.data)


    # UPDATE
    elif request.method == 'PUT':

        serializer = StudentSerializer(student,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Student Updated',
                'data': serializer.data
            })
        return Response(serializer.errors)


    # DELETE
    elif request.method == 'DELETE':
        student.delete()
        return Response({
            'message': 'Student Deleted'
        })
    


# {
#    "name":"Mehak",
#    "course":"AI",
#    "email":"mehak@gmail.com"
# }