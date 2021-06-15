from django.urls import path
from . import views

urlpatterns = [

path('staff_list/',views.staff_list,name='staff_list'),
path('emp_delete/',views.deleteemp,name='emp_delete'),
path('staff_to_add/',views.staff_to_add,name='staff_to_add'),
path('add_to_branch/',views.add_to_branch_employee,name='add_to_branch')



]
