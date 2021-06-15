from django.urls import path
from . import views

urlpatterns = [

path('add_branch/',views.add_branch,name='add_branch'),
path('delete_branch/',views.delete_branch,name='delete_branch'),
path('show_branch/',views.showBranch,name='show_branch')

]