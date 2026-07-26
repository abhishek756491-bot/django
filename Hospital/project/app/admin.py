from django.contrib import admin
from app.models import *
# Register your models here.

admin.site.register(Department)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Registration)
admin.site.register(PatientQuery)
admin.site.register(Service)
