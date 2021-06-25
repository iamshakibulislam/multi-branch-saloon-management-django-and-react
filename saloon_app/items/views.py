from django.shortcuts import render
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from companybranch.models import Branch,BranchEmployee
from authentication.models import User
from .models import *
from django.db.models import Q


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_providers(request):
	info = update_providers_info(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']
		name = info.validated_data['name']
		company = info.validated_data['company']
		contact = info.validated_data['contact']

		sel = providers.objects.get(id=int(identify))

		if name != sel.name:
			sel.name = name

		if company != sel.company:
			sel.company = company

		if contact != sel.contact:
			sel.contact = contact

		sel.save()

		return Response({'status':'updated'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_provider(request):
	info = update_provider_info(data=request.data)

	if info.is_valid():
		res = {}

		sel = providers.objects.get(id=int(info.validated_data['identify']))

		res['id'] = sel.id
		res['name'] = sel.name
		res['company'] = sel.company
		res['contact'] = sel.contact

		return Response(res)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def del_provider(request):
	info = del_provider_data(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']

		providers.objects.get(id=int(identify)).delete()

		return Response({'status':'deleted'})

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def list_providers(request):
	info = []
	getinfo = providers.objects.all()

	for x in getinfo:
		info.append({'id':x.id,'name':x.name,'company':x.company,'contact':x.contact})


	return Response(info)


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_providers(request):
	info = providers_data(data=request.data)

	if info.is_valid():
		name = info.validated_data['name']
		company = info.validated_data['company']
		contact = info.validated_data['contact']

		providers.objects.create(name = name,company=company,contact = contact)

		return Response({'status':'created'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_item_info(request):
	info = item_update(data=request.data)
	if info.is_valid():

		name = info.validated_data['name']
		identify = info.validated_data['identify']
		cat = info.validated_data['cat']
		price = info.validated_data['price']


		sel_item = product_items.objects.get(id=int(identify))

		sel_cat = item_category.objects.get(id=int(cat))

		if sel_item.name != name:
			sel_item.name = name


		if sel_item.price != price:
			sel_item.price = price


		if sel_item.category != sel_cat:
			sel_item.category = sel_cat


		sel_item.save()


		return Response({'status':'updated'})






@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_item_info(request):
	ser = item_info(data=request.data)

	if ser.is_valid():
		info = {'item_info':{},'categories':[]}
		sel = product_items.objects.get(id=int(ser.validated_data['identify']))

		info['item_info']['id'] = sel.id
		info['item_info']['name'] = sel.name
		info['item_info']['category'] = sel.category.id
		info['item_info']['price'] = sel.price


		for x in item_category.objects.all():
			info['categories'].append({'id':x.id,'name':x.name})


		return Response(info)





@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def cat_update(request):
	info = get_cat_update(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']
		name = info.validated_data['name']

		sel = item_category.objects.get(id=int(identify))

		if sel.name != name:
			sel.name = name
			sel.save()

		return Response({'status':'updated'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_cat_info(request):
	ser = get_cat_information(data=request.data)
	if ser.is_valid():

		info = ser.validated_data['identify']
		result = {}

		sel = item_category.objects.get(id=int(info))
		result['id'] = sel.id
		result['name'] = sel.name

		return Response(result)

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_cat(request):
	info = delete_category(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']

		item_category.objects.get(id=int(identify)).delete()

		return Response({'status':'deleted'})









@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def view_categories(request):
	info = []

	obj = item_category.objects.all()

	for x in obj:
		
		count=len(product_items.objects.filter(category=x))
		info.append({'total_items':count,'name':x.name,'id':x.id})



	return Response(info)














@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_category(request):
	info = add_item_category(data=request.data)

	if info.is_valid():
		name = info.validated_data['name']

		item_category.objects.create(name=name)

		return Response({'status':'created'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_items(request):
	data = itemdata(data=request.data)

	if data.is_valid():

		name = data.validated_data['name']
		price = float(data.validated_data['price'])

		catid = data.validated_data['cat']

		selcat = item_category.objects.get(id=int(catid))

		p=product_items.objects.create(name=name,price=price,category=selcat)

		return Response({"status":"added","id":p.id})





@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def list_items(request):
	info = {'items':[],'categories':[]}
	list_of_items=product_items.objects.all()

	for x in list_of_items:
		info['items'].append({"id":x.id,"name":x.name,"price":x.price,'category':x.category.name})

	selcat = item_category.objects.all()

	for x in selcat:
		info['categories'].append({'id':x.id,'name':x.name})


	return Response(info)




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_items(request):

	getdata = delete_item(data=request.data)

	if getdata.is_valid():

		getid = getdata.validated_data['identify']

		product_items.objects.get(id=int(getid)).delete()

		return Response({"status":"deleted"})
	
	