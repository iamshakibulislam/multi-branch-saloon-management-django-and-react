from django.urls import path
from . import views

urlpatterns = [

path('add_branch/',views.add_branch,name='add_branch'),
path('delete_branch/',views.delete_branch,name='delete_branch'),
path('show_branch/',views.showBranch,name='show_branch'),
path('get_branch/',views.get_branch),
path('update_branch/',views.update_branch),
path('set_company_info/',views.set_company_info),
path('show_company_info/',views.show_company_info)

]