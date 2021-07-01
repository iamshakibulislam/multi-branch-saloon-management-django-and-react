from rest_framework import serializers
from authentication.models import User
from .models import *


class itemdata(serializers.Serializer):
	name = serializers.CharField()
	price = serializers.CharField()
	sale_price = serializers.IntegerField()
	cat = serializers.IntegerField()


class delete_item(serializers.Serializer):
	identify = serializers.IntegerField()



class add_item_category(serializers.Serializer):
	name = serializers.CharField(max_length=200,required=True)



class delete_category(serializers.Serializer):
	identify = serializers.IntegerField()

class get_cat_information(serializers.Serializer):
	identify = serializers.IntegerField()

class get_cat_update(serializers.Serializer):
	identify = serializers.IntegerField()
	name = serializers.CharField(max_length=200,required=False,allow_null=True)


class item_info(serializers.Serializer):
	identify = serializers.IntegerField()


class item_update(serializers.Serializer):
	identify = serializers.IntegerField(allow_null=True,required=False)
	cat = serializers.IntegerField(allow_null=True,required=False)
	name = serializers.CharField(allow_null=True,required=False)
	price = serializers.FloatField(allow_null=True,required=False)
	sale_price = serializers.FloatField(allow_null=True,required=False)


class providers_data(serializers.Serializer):
	name = serializers.CharField(max_length=200,allow_null=True,required=False)
	company = serializers.CharField(max_length=200,allow_null=True,required=False)
	contact = serializers.CharField(max_length=300,allow_null=True,required=False)


class del_provider_data(serializers.Serializer):
	identify=serializers.IntegerField()



class update_provider_info(serializers.Serializer):
	identify=serializers.IntegerField()


class update_providers_info(serializers.Serializer):
	identify = serializers.IntegerField(required=False)
	name = serializers.CharField(max_length=200,allow_null=True,required=False)
	company = serializers.CharField(max_length=200,allow_null=True,required=False)
	contact = serializers.CharField(max_length=300,allow_null=True,required=False)


class add_Stock(serializers.Serializer):
	itemid = serializers.IntegerField()
	providerid = serializers.IntegerField()
	quantity = serializers.IntegerField()
	branchid = serializers.IntegerField()



class get_branch_id(serializers.Serializer):
	identify=serializers.IntegerField()

class get_staff_id(serializers.Serializer):
	identify=serializers.IntegerField()


class get_order_data(serializers.Serializer):
	branchid = serializers.IntegerField()
	staffid = serializers.IntegerField()
	services = serializers.CharField(max_length=500)
	date = serializers.CharField(max_length=500)
	time = serializers.CharField(max_length=500)