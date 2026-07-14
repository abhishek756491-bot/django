from django import forms
from .models import *


class RegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(
        max_length=100, 
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        label="Confirm Password"
    )
    class Meta:
        model = PatientModel
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
        model = PatientModel
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