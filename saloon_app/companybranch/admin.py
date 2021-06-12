from django.contrib import admin

# Register your models here.
from .models import Manager, Branch


admin.site.register(Manager)
admin.site.register(Branch)