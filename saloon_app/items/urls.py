from django.urls import path
from . import views

urlpatterns = [

	path('add_items/',views.add_items,name='add_item'),
	path('list_items/',views.list_items,name='list_items'),
	path('delete_items/',views.delete_items,name='delete_items'),
	path('add_category/',views.add_category,name='add_category'),
	path('view_categories/',views.view_categories,name='view categories'),
	path('delete_category/',views.delete_cat),
	path('get_cat_info/',views.get_cat_info),
	path('cat_update/',views.cat_update),
	path('get_item_info/',views.get_item_info),
	path('update_item/',views.update_item_info),
	path('add_providers/',views.add_providers),
	path('list_providers/',views.list_providers),
	path('del_provider/',views.del_provider),
	path('update_provider/',views.update_provider),
	path('update_providers/',views.update_providers),
	path('get_items_provider_list/',views.get_items_provider_list),
	path('add_to_stock/',views.add_to_stock),
	path('get_stock_data/',views.get_stock_data),
	path('get_staff/',views.get_staff),
	path('get_services_list/',views.get_services_list),
	path('place_order/',views.place_order),
	path('order_details/',views.order_details),
	path('get_upcomming_appointment/',views.get_upcomming_appointment),
	path('get_services/',views.get_services),
	path('get_items_list/',views.get_items_list),
	path('get_order_details/',views.get_order_details),
	path('update_order/',views.update_order),
	path('sales_report/',views.sales_report),
	path('get_balance/',views.get_balance)

]