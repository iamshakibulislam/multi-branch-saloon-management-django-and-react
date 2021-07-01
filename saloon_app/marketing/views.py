from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from companybranch.models import Branch,BranchEmployee
from .models import *

from authentication.models import User
from django.db.models import Q

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def all_service_categories(request):
	sel = ServiceCategorey.objects.all()

	res = []

	for x in sel:
		res.append({'id':x.id,'title':x.title})

	return Response(res)


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def cat_showing(request):
	info = cat_show(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']

		sel = ServiceCategorey.objects.get(id=int(identify))

		return Response({'id':sel.id,'title':sel.title})

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_cat_update(request):
	info = cat_information(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']
		title = info.validated_data['title']

		sel = ServiceCategorey.objects.get(id=int(identify))

		if sel.title != title:
			sel.title = title
			sel.save()

		return Response({'status':'updated'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_category(request):
	info = get_cat_delete_id(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']

		ServiceCategorey.objects.get(id=int(identify)).delete()

		return Response({"status":"deleted"})

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def show_service_category(request):
	res = []

	all_serv = ServiceCategorey.objects.all()

	for x in all_serv:
		tservice= len(Service.objects.filter(category=x))
		res.append({'id':x.id,'title':x.title,'total_services':tservice})

	return Response(res)


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_service_category(request):
	info = cat_name(data=request.data)

	if info.is_valid():
		title= info.validated_data['title']
		ServiceCategorey.objects.create(title=title)

	return Response({'status':'added'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def updateServices(request):
	info = updateservice(data=request.data)

	if info.is_valid():

		getid = info.validated_data['identify']
		title = info.validated_data['title']
		servicelocation = info.validated_data['servicelocation']
		cost = info.validated_data['cost']
		taxes = info.validated_data['taxes']
		serviceduration = info.validated_data['serviceduration']
		servicecommision = info.validated_data['servicecommision']
		monthlytarget = info.validated_data['monthlytarget']


		sel = Service.objects.get(id=int(getid))

		if sel.title != title:
			sel.title = title

		if sel.servicelocation != servicelocation:
			sel.servicelocation = servicelocation

		if sel.cost != cost:
			sel.cost = cost

		if sel.taxes != taxes:
			sel.taxes = taxes

		if sel.serviceduration != serviceduration:
			sel.serviceduration = serviceduration

		if sel.servicecommision != servicecommision:
			sel.servicecommision = servicecommision

		if sel.monthlytarget != monthlytarget:
			sel.monthlytarget = monthlytarget

		sel.save()

		return Response({'status':'updated'})

	else:
		return Response({'status':'failed'})






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
		catid = ser.validated_data['catid']

		sel_cat = ServiceCategorey.objects.get(id=int(catid))

		Service.objects.create(

			title = title,
			cost = int(cost),
			taxes = tax,
			serviceduration = duration,
			servicecommision = commision,
			monthlytarget = target,
			category = sel_cat


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




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def getServiceInfo(request):
	info = service_id(data=request.data)

	if info.is_valid():
		getid = info.validated_data['serviceid']

		result={}

		sel = Service.objects.get(id=int(getid))

		result['title'] = sel.title
		result['servicelocation'] = sel.servicelocation
		result['cost'] = sel.cost
		result['taxes'] = sel.taxes
		result['serviceduration'] = sel.serviceduration
		result['servicecommision'] = sel.servicecommision
		result['monthlytarget'] = sel.monthlytarget
		result['id'] = sel.id


		return Response(result)



