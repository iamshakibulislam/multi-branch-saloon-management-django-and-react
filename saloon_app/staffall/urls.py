from django.urls import path
from . import views

urlpatterns = [

path('staff_list/',views.staff_list,name='staff_list'),
path('emp_delete/',views.deleteemp,name='emp_delete'),
path('staff_to_add/',views.staff_to_add,name='staff_to_add'),
path('add_to_branch/',views.add_to_branch_employee,name='add_to_branch'),
path('get_services/',views.get_services),
path('get_user_info/',views.get_user_info),
path('update_user_info/',views.updateInfo),
path('get_services_staff/',views.get_services_staff),
path('my_orders/',views.my_orders)



]
