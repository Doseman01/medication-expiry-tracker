# views.py
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Medication
from .serializers import MedicationSerializer
from datetime import date, timedelta

# HTML View (for rendering template)
def medication_list(request):
    medications = Medication.objects.all()
    return render(request, 'medications/medication_list.html', {'medications': medications})

# REST API View – GET and POST
@api_view(['GET', 'POST'])
def medication_list_api(request):
    if request.method == 'GET':
        medications = Medication.objects.all()
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MedicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# REST API View – GET single, PUT, DELETE
@api_view(['GET', 'PUT', 'DELETE'])
def medication_detail_api(request, pk):
    try:
        medication = Medication.objects.get(pk=pk)
    except Medication.DoesNotExist:
        return Response({'error': 'Medication not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MedicationSerializer(medication)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MedicationSerializer(medication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        medication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# REST API View – Check medications expiring soon
@api_view(['GET'])
def expiring_medications(request):
    """
    Return medications expiring within the next `days` (default 30).
    Use /medications/api/expiring/?days=60 for custom days filter.
    """
    days = int(request.GET.get('days', 30))  # default to 30 days
    today = date.today()
    upcoming = today + timedelta(days=days)
    medications = Medication.objects.filter(expiration_date__lte=upcoming)
    serializer = MedicationSerializer(medications, many=True)
    return Response(serializer.data)

