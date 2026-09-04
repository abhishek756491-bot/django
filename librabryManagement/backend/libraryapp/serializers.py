from rest_framework import serializers
from .models import Category
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    available_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_available_quantity(self, obj):
        issued_count = obj.issued_records.filter(is_returned=False).count()
        available = int(obj.quantity) - issued_count
        return available if available >= 0 else 0

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class IssuedBookSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.full_name",read_only=True)
    student_id = serializers.CharField(source="student.student_id",read_only=True)
    book_title = serializers.CharField(source="book.title",read_only=True)
    book_isbn = serializers.CharField(source="book.isbn",read_only=True)
    book_cover = serializers.ImageField(source="book.cover_image",read_only=True)

    class Meta:
        model = IssuedBook
        fields = "__all__"

        