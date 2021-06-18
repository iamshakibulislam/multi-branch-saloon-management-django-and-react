from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import getId,adding_services
from companybranch.models import Branch,BranchEmployee
from .models import *

from authentication.models import User
from django.db.models import Q

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_service(request):
	ser=adding_services(data=request.data)
	if ser.is_valid():
		title = ser.validated_data['title']
		cost = ser.validated_data['costs']
		tax = ser.validated_data['tax']
		duration = ser.validated_data['duration']
		target = ser.validated_data['target']
		commision = ser.validated_data['commision']

		Service.objects.create(

			title = title,
			cost = int(cost),
			taxes = tax,
			serviceduration = duration,
			servicecommision = commision,
			monthlytarget = target


			)

		return Response({'status':'created'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def show_service(request):
	obj = Service.objects.all()
	info = []

	for x in obj:
		info.append({'id':x.id,'title':x.title,'cost':x.cost})


	return Response(info)




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_service(request):
	sel = getId(data=request.data)
	if sel.is_valid():
		Service.objects.get(id=int(sel.validated_data['identify'])).delete()

	return Response({'status':'deleted'})