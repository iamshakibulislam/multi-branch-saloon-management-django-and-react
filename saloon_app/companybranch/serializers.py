from rest_framework import serializers
from .models import Branch

class get_branch_add_data(serializers.Serializer):
	name = serializers.CharField(max_length=100)
	address=serializers.CharField(max_length=240)
	branch_email = serializers.CharField(max_length=250)
	branch_phone = serializers.CharField(max_length=250)


class get_delete_id(serializers.Serializer):
	identify = serializers.IntegerField()


class get_branch_id(serializers.Serializer):
	getid=serializers.IntegerField()


class update_branches(serializers.Serializer):
	identify = serializers.IntegerField()
	name = serializers.CharField(max_length=200,allow_null=True,required=False)
	address = serializers.CharField(max_length=200,allow_null=True,required=False)
	branch_email = serializers.CharField(max_length=200,allow_null=True,required=False)
	branch_phone = serializers.CharField(max_length=200,allow_null=True,required=False)