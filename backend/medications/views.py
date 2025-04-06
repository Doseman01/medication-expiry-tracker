from django.shortcuts import render
from .models import Medication

def medication_list(request):
    medications = Medication.objects.all()
    return render(request, 'medications/medication_list.html', {'medications': medications})

