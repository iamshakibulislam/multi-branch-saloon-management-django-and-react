from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(BranchEmployee)
admin.site.register(Manager)
admin.site.register(Branch)

admin.site.register(company_setup)