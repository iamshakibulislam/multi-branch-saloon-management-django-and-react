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
	catid = serializers.IntegerField()


class service_id(serializers.Serializer):
	serviceid = serializers.IntegerField(allow_null=True,required=False)



class updateservice(serializers.Serializer):
	identify = serializers.IntegerField(allow_null=False,required=True)
	title = serializers.CharField(max_length=200,allow_null=True,required=False)
	servicelocation = serializers.CharField(max_length=300,allow_null=True,required=False)
	cost = serializers.IntegerField(required=False,allow_null=True)
	taxes = serializers.IntegerField(required=False,allow_null=True)
	serviceduration = serializers.IntegerField(required=False,allow_null=True)
	servicecommision = serializers.IntegerField(required=False,allow_null=True)
	monthlytarget = serializers.IntegerField(required=False,allow_null=True)




class cat_name(serializers.Serializer):
	title = serializers.CharField(max_length=200,allow_null=True,required=False)


class get_cat_delete_id(serializers.Serializer):
	identify = serializers.IntegerField()


class cat_information(serializers.Serializer):
	identify = serializers.IntegerField()
	title = serializers.CharField(max_length=400,allow_null=True,required=False)


class cat_show(serializers.Serializer):
	identify = serializers.IntegerField()