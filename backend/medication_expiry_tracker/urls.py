from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('medications/',
include('medications.urls')),
    path('admin/', admin.site.urls),
]
