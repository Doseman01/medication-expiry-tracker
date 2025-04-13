# medication_expiry_tracker/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('medications/', include('medications.urls')),  # both HTML and API
]

