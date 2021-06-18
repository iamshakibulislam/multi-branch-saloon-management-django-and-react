from rest_framework import serializers
from authentication.models import User
from .models import *


class getId(serializers.Serializer):
	identify = serializers.IntegerField()


class adding_services(serializers.Serializer):
	title = serializers.CharField(max_length=200)
	costs = serializers.IntegerField()
	tax = serializers.IntegerField()
	duration = serializers.IntegerField()
	commision = serializers.IntegerField()
	target = serializers.IntegerField()
