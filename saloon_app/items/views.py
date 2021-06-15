from django.shortcuts import render
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import itemdata,delete_item
from companybranch.models import Branch,BranchEmployee
from authentication.models import User
from .models import *
from django.db.models import Q




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_items(request):
	data = itemdata(data=request.data)

	if data.is_valid():

		name = data.validated_data['name']
		price = float(data.validated_data['price'])

		p=product_items.objects.create(name=name,price=price)

		return Response({"status":"added","id":p.id})





@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def list_items(request):
	info = []
	list_of_items=product_items.objects.all()

	for x in list_of_items:
		info.append({"id":x.id,"name":x.name,"price":x.price})


	return Response(info)




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_items(request):

	getdata = delete_item(data=request.data)

	if getdata.is_valid():

		getid = getdata.validated_data['identify']

		product_items.objects.get(id=int(getid)).delete()

		return Response({"status":"deleted"})
	
	