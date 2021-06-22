from rest_framework import serializers
from marketing.models import *
from companybranch.models import *
from staffall.models import *
from authentication.models import User
import json





class staff_list(serializers.Serializer):

	branch = serializers.CharField(max_length=40)


class add_to_branch(serializers.Serializer):
	userid = serializers.IntegerField()
	branchid=serializers.IntegerField()


class user_data(serializers.Serializer):
	userid = serializers.IntegerField()




class updateUser(serializers.Serializer):

	first_name = serializers.CharField(max_length=50,required=False,allow_null=True)
	last_name = serializers.CharField(max_length=50,required=False,allow_null=True)
	
	is_staff = serializers.BooleanField(default=False)
	is_manager = serializers.BooleanField(default=False)
	is_admin = serializers.BooleanField(default=False)

	password = serializers.CharField(max_length=44,required=False,allow_null=True)
	

	email = serializers.EmailField(max_length=90,required=False)
	username = serializers.CharField(max_length=55,required=False,allow_null=True)


	dob = serializers.CharField(max_length=120,required=False,allow_null=True)
	service = serializers.CharField(max_length=300,required=False,allow_null=True)
	workday = serializers.CharField(max_length=220,required=False,allow_null=True)
	time_from = serializers.CharField(max_length=22,required=False,allow_null=True)
	time_to = serializers.CharField(max_length=22,required=False,allow_null=True)
	mobile = serializers.CharField(max_length=22,required=False,allow_null=True)
	address = serializers.CharField(max_length=44,required=False,allow_null=True)
	color = serializers.CharField(max_length=33,required=False,allow_null=True)
	branchid = serializers.IntegerField(required=False,allow_null=True)
	