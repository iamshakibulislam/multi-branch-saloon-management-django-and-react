from django.contrib import admin
from .models import Item,ItemCategorey,Supplier,ServiceCategorey,Service
# Register your models here.

admin.site.register(ItemCategorey)
admin.site.register(Item)
admin.site.register(ServiceCategorey)
admin.site.register(Service)

admin.site.register(Supplier)
