from django.urls import path
from . import views


urlpatterns = [

path('show_service/',views.show_service),
path('delete_service/',views.delete_service),
path('add_service/',views.add_service),
path('get_service_info/',views.getServiceInfo),
path('update_services/',views.updateServices)

]