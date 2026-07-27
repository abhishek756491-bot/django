from django import forms
from .models import *


class RegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(
        max_length=100, 
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        label="Confirm Password"
    )
    class Meta:
        model = Registration
        fields = ('patient_name', 'patient_email', 'patient_city', 'patient_mobile', 'patient_password')
        widgets = {
            'patient_name': forms.TextInput(attrs={'class': 'form-control'}),
            'patient_email': forms.EmailInput(attrs={'class': 'form-control'}),
            'patient_city': forms.TextInput(attrs={'class': 'form-control'}),
            'patient_mobile': forms.NumberInput(attrs={'class': 'form-control'}),
            'patient_password': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

class LoginForm(forms.ModelForm):
    class Meta:
        model = Registration
        fields = ('patient_email', 'patient_password')
        widgets = {
            'patient_email': forms.EmailInput(attrs={'class': 'form-control'}),
            'patient_password': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

class QueryForm(forms.ModelForm):
    class Meta:
        model = PatientQuery
        fields = ('patient_email','patient_name','patient_query')
        widgets = {
            'patient_email': forms.EmailInput(attrs={'class': 'form-control'}),
            'patient_name': forms.TextInput(attrs={'class': 'form-control'}),
            'patient_query': forms.TextInput(attrs={'class': 'form-control'}),  
        }

# Appointment
from django import forms
from .models import Patient, Appointment

class AppointmentBookingForm(forms.Form):

    # Patient Details
    name =forms.CharField(
    widget=forms.TextInput(attrs={"class":"form-control"})
)

    age = forms.IntegerField(
    widget=forms.TextInput(attrs={"class":"form-control"})
)
    gender = forms.ChoiceField(
    choices=Patient.GENDER_CHOICES,
    widget=forms.Select(attrs={"class":"form-select"})
)
    phone = forms.CharField(
    widget=forms.TextInput(attrs={"class":"form-control"})
)
    address = forms.CharField(
    widget=forms.TextInput(attrs={"class":"form-control"})
)
    symptoms = forms.CharField(
    widget=forms.TextInput(attrs={"class":"form-control"})
)

    # Appointment Details
    doctor = forms.ModelChoiceField(queryset=Doctor.objects.all())
    date = forms.DateField(widget=forms.DateInput(attrs={"type":"date"}))
    time = forms.TimeField(widget=forms.TimeInput(attrs={"type":"time"}))
    reason = forms.CharField(widget=forms.TextInput(attrs={"class":"form-control"}), required=False)