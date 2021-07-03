from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(ItemCategorey)
admin.site.register(Item)
admin.site.register(ServiceCategorey)
admin.site.register(Service)

admin.site.register(Supplier)

admin.site.register(vouchers)
admin.site.register(buy_voucher)
