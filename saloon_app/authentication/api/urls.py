from django.urls import path
from authentication.api.views import registration_view

from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = 'authentication'

urlpatterns = [
    path('register', registration_view, name="register"),


    path('login', obtain_auth_token, name="login"),
    path('user_info/',views.user_info)

]
