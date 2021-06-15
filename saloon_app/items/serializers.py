from rest_framework import serializers
from authentication.models import User
from .models import *


class itemdata(serializers.Serializer):
	name = serializers.CharField()
	price = serializers.CharField()


class delete_item(serializers.Serializer):
	identify = serializers.IntegerField()