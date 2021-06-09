from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token



urlpatterns = [
      path('', views.apiOverView, name= "api-overview"),
      path('add-staff', views.addstaff, name="add-staff"),


]
