from django.contrib import admin
from .models import Employe,track_service_providers,workdays
# Register your models here.

admin.site.register(Employe)
admin.site.register(workdays)
admin.site.register(track_service_providers)