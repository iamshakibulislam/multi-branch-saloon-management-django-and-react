from django.contrib import admin
from .models import *

admin.site.register(product_items)
admin.site.register(item_category)
admin.site.register(providers)
admin.site.register(buy_items)
admin.site.register(order)
admin.site.register(order_services)
admin.site.register(order_items)
admin.site.register(stock_transfer)
