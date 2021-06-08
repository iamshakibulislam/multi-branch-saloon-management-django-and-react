from django.db.models import fields
from rest_framework import serializers
from staffall.models import Employe


class TaskSerializer(serializers.ModelSerializer):
      class Meta:
            model = Employe
            fields = '__all__'