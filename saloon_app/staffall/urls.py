from django.urls import path
from . import views

urlpatterns = [

path('staff_list/',views.staff_list,name='staff_list'),
path('emp_delete/',views.deleteemp,name='emp_delete')



]
