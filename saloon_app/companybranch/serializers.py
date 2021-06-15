from rest_framework import serializers
from .models import Branch

class get_branch_add_data(serializers.Serializer):
	name = serializers.CharField(max_length=100)
	address=serializers.CharField(max_length=240)


class get_delete_id(serializers.Serializer):
	identify = serializers.IntegerField()