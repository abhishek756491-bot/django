from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('api/admin/login/',admin_login_api),
    path('api/categories/add/',add_category),
    path('api/categories/',list_categories),
    path('api/update_category/<int:id>/',update_category),
    path('api/delete_category/<int:id>/',delete_category),

    path('api/authors/add/',add_author),
    path('api/authors/',list_authors),
    path('api/update_author/<int:id>/',update_author),
    path('api/delete_author/<int:id>/',delete_author),

    path('api/books/add/',add_book),
    path('api/books/',list_books),
    path('api/update_book/<int:id>/',update_book),
    path('api/delete_book/<int:id>/',delete_book),
    
    path('api/change_admin_password/',change_admin_password),

    path('api/user/signup/',user_signup),
    path('api/user/login/',user_login),

    path('api/user_stats/',user_stats),

    path('api/user/books/',user_list_books)
]