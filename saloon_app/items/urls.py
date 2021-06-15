from django.urls import path
from . import views

urlpatterns = [

	path('add_items/',views.add_items,name='add_item'),
	path('list_items/',views.list_items,name='list_items'),
	path('delete_items/',views.delete_items)

]