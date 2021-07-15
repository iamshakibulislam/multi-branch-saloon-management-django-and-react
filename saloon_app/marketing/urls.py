from django.urls import path
from . import views


urlpatterns = [

path('show_service/',views.show_service),
path('delete_service/',views.delete_service),
path('add_service/',views.add_service),
path('get_service_info/',views.getServiceInfo),
path('update_services/',views.updateServices),
path('add_service_category/',views.add_service_category),
path('show_category/',views.show_service_category),
path('delete_category/',views.delete_category),
path('cat_show/',views.cat_showing),
path('cat_update/',views.get_cat_update),
path('all_service_categories/',views.all_service_categories),
path('add_voucher/',views.add_voucher),
path('voucher_list/',views.voucher_list),
path('delete_voucher/',views.delete_voucher),
path('get_voucher_info/',views.get_voucher_info),
path('update_voucher/',views.update_voucher),
path('buy_voucher/',views.buy_vouchers)

]