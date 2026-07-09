from django.shortcuts import render, redirect, get_object_or_404
from .models import *

# Dashboard
def patient_list(request):
    patients = Patient.objects.all()
    return render(request, "patient/list.html", {
        "patients": patients
    })

def dashboard(request):
    return render(request, "dashboard.html")


# ---------------- Patient List ----------------
def patient_list(request):
    patients = Patient.objects.all()
    return render(request, "patient/list.html", {"patients": patients})


# ---------------- Add Patient ----------------
def add_patient(request):
    if request.method == "POST":
        Patient.objects.create(
            name=request.POST.get("name"),
            age=request.POST.get("age"),
            gender=request.POST.get("gender"),
            phone=request.POST.get("phone"),
            address=request.POST.get("address"),
        )
        return redirect("patient_list")

    return render(request, "patient/add.html")


# ---------------- Edit Patient ----------------
def edit_patient(request, id):
    patient = get_object_or_404(Patient, id=id)

    if request.method == "POST":
        patient.name = request.POST.get("name")
        patient.age = request.POST.get("age")
        patient.gender = request.POST.get("gender")
        patient.phone = request.POST.get("phone")
        patient.address = request.POST.get("address")
        patient.save()

        return redirect("patient_list")

    return render(request, "patient/edit.html", {"patient": patient})


# ---------------- Delete Patient ----------------
def delete_patient(request, id):
    patient = get_object_or_404(Patient, id=id)
    patient.delete()
    return redirect("patient_list")


# ---------------- Patient Detail ----------------
def patient_detail(request, id):
    patient = get_object_or_404(Patient, id=id)
    return render(request, "patient/detail.html", {"patient": patient})



#--------------------doctor list--------------------from .models import Doctor, Department

def doctor_list(request):

    doctors = Doctor.objects.all()

    return render(
        request,
        "doctor/list.html",
        {'doctors':doctors}
    )


def add_doctor(request):

    departments = Department.objects.all()

    if request.method=="POST":

        Doctor.objects.create(

            name=request.POST['name'],

            department=Department.objects.get(
                id=request.POST['department']
            ),

            specialization=request.POST['specialization'],

            phone=request.POST['phone']

        )

        return redirect('doctor_list')

    return render(
        request,
        "doctor/add.html",
        {'departments':departments}
    )

#--------------------- appointment list--------------------
from .models import Appointment, Patient, Doctor

def appointment_list(request):
    appointments = Appointment.objects.all()
    return render(
        request,
        "appointment/list.html",
        {"appointments": appointments}
    )


def add_appointment(request):

    patients = Patient.objects.all()
    doctors = Doctor.objects.all()

    if request.method == "POST":

        Appointment.objects.create(

            patient=Patient.objects.get(
                id=request.POST['patient']
            ),

            doctor=Doctor.objects.get(
                id=request.POST['doctor']
            ),

            appointment_date=request.POST['appointment_date'],

            appointment_time=request.POST['appointment_time'],

            status=request.POST['status']

        )

        return redirect('appointment_list')

    return render(
        request,
        "appointment/add.html",
        {
            "patients": patients,
            "doctors": doctors
        }
    )