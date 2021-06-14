from django.contrib import admin

# Register your models here.
from .models import Manager, Branch,BranchEmployee

admin.site.register(BranchEmployee)
admin.site.register(Manager)
admin.site.register(Branch)