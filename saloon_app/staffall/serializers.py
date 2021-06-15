from rest_framework import serializers
from authentication.models import User
from staffall.models import *


class staff_list(serializers.Serializer):

	branch = serializers.CharField(max_length=40)


class add_to_branch(serializers.Serializer):
	userid = serializers.IntegerField()
	branchid=serializers.IntegerField()