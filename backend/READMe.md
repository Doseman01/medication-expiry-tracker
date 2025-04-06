# 💊 Medication Expiry Tracking System

This is a simple Django-based application that allows users to keep track of medications and their expiry dates. The goal is to help prevent the use of expired drugs by making it easy to monitor and manage inventory.

---

## 📁 Project Structure Setup (Day 2)

### ✅ Requirements

Before starting, ensure you have the following installed:

- Python 3.12+
- pip
- Virtualenv (optional but recommended)

---

## 🏗️ Step-by-Step Setup

### 1. Create a Virtual Environment

python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
2. Install Django
pip install django

3. Start a Django Project
django-admin startproject medication_expiry_tracker
cd medication_expiry_tracker

4. Create an App
python manage.py startapp medications

5. Register App in settings.py
In medication_expiry_tracker/settings.py, add the app:

INSTALLED_APPS = [
    ...
    'medications',
]

6. Create the Medication Model
In medications/models.py:

from django.db import models

class Medication(models.Model):
    name = models.CharField(max_length=255)
    expiry_date = models.DateField()

    def __str__(self):
        return self.name

7. Make Migrations
python manage.py makemigrations
python manage.py migrate

8. Create a View
In medications/views.py:

from django.shortcuts import render
from .models import Medication

def medication_list(request):
    medications = Medication.objects.all()
    return render(request, 'medications/medication_list.html', {'medications': medications})

9. Configure URLs
In medications/urls.py:

from django.urls import path
from . import views

urlpatterns = [
    path('', views.medication_list, name='medication_list'),
]
In medication_expiry_tracker/urls.py:

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('medications/', include('medications.urls')),
]
10. Create Template Directory
Inside medications/, create a folder named templates/medications/ and add medication_list.html:

<!-- medications/templates/medications/medication_list.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Medication List</title>
</head>
<body>
    <h1>Medications</h1>
    <ul>
        {% for med in medications %}
            <li>{{ med.name }} - Expires on: {{ med.expiry_date }}</li>
        {% endfor %}
    </ul>
</body>
</html>
Also, ensure your TEMPLATES setting in settings.py includes 'DIRS': [BASE_DIR / 'templates'] if you're planning to use a global templates directory.

🐞 Common Issues I Faced
ModuleNotFoundError due to incorrect app naming or import paths

TemplateDoesNotExist because the HTML file was in the wrong folder

OperationalError: no such table – forgot to run migrate

404 errors due to missing default route or wrong URL configuration

🧠 Lessons Learnt
Django is very structured — missing a step easily breaks things.

Debugging takes time but helps solidify learning.

Reading official documentation and trying examples out is key!

💡 What's Next?
Add forms and CRUD operations

Integrate user authentication

Set up Docker for containerization

Deploy on a cloud service (e.g., AWS)

🤝 Contributing
Feel free to fork this project and add your improvements. This is part of a beginner-friendly, open-source initiative to build in public and learn DevOps with a practical project.

📬 Let's Connect
If you're working on something similar or just learning Django, let’s connect!

🔖 License
This project is open source and available under the MIT License.
