# medications/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.medication_list, name='medications-html'),                      # HTML view
    path('api/', views.medication_list_api, name='medications-api'),               # GET + POST API
    path('api/<int:pk>/', views.medication_detail_api, name='medications-detail'), # GET + PUT + DELETE
    path('api/expiring/', views.expiring_medications, name='expiring_medications'),
]

