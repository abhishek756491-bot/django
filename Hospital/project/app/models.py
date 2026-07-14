from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=120)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    specialization = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name


class Patient(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True)
    symptoms = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("Scheduled", "Scheduled"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Scheduled")

    class Meta:
        ordering = ["date", "time"]

    def __str__(self):
        return f"{self.patient} with {self.doctor} on {self.date}"
        


# crud

class PatientModel(models.Model):
    patient_name = models.CharField(max_length=50)
    patient_email = models.EmailField()
    patient_city = models.CharField(max_length=50)
    patient_mobile = models.IntegerField()
    patient_password = models.CharField(max_length=25)


class PatientQuery(models.Model):
    patient_name = models.CharField(max_length=50)
    patient_email = models.EmailField()
    patient_query = models.TextField()