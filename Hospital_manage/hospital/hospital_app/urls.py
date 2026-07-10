from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('patients/', views.patient_list, name='patient_list'),
    path('patients/add/', views.add_patient, name='add_patient'),
    path('patients/edit/<int:id>/', views.edit_patient, name='edit_patient'),
    path('patients/delete/<int:id>/', views.delete_patient, name='delete_patient'),
    path('patients/detail/<int:id>/', views.patient_detail, name='patient_detail'),
    path('doctors/', views.doctor_list, name='doctor_list'),
    path('doctors/add/', views.add_doctor, name='add_doctor'),
    path('appointments/',views.appointment_list,name='appointment_list'),
    path('appointments/add/',views.add_appointment,name='add_appointment'),
    path('bills/', views.billing_list, name='billing_list'),
    path('bills/add/', views.add_bill, name='add_bill'),
    path('departments/', views.department_list, name='department_list'),
    path('departments/add/', views.add_department, name='add_department'),
    path('departments/edit/<int:id>/', views.edit_department, name='edit_department'),
    path('departments/delete/<int:id>/', views.delete_department, name='delete_department'),
    path("login/", views.login_user, name="login"),
    path("logout/", views.logout_user, name="logout"),
]  