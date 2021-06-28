from django.shortcuts import render
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from companybranch.models import Branch,BranchEmployee
from staffall.models import *
from datetime import datetime,timedelta
from .models import *
from django.db.models import Q,Sum
import json
from authentication.models import User


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_upcomming_appointment(request):
	filtr = order.objects.filter(Q(appointment_date__gt=datetime.now()) & Q(staff = request.user))

	info = []

	for x in filtr:
		if x not in info:
			info.append(x.appointment_date)


	return Response(info)







@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def order_details(request):
	res = []
	current_services=""
	find_orders=order.objects.filter(customer=request.user)

	for x in find_orders:
		get_services = order_services.objects.filter(order_ref=x)

		for ser in get_services:
			current_services = current_services +' , '+ser.servic_ref.title

		current_services = current_services[2:]


		res.append({'id':x.id,'date':x.appointment_date,'time':x.appointment_time,'branch':x.branch.name,'staff':x.staff.first_name+' '+x.staff.last_name,'services':current_services,'status':x.status})


	return Response(res)








@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def place_order(request):
	info = get_order_data(data=request.data)

	if info.is_valid() :
		branchid = info.validated_data['branchid']
		print('your branch ',branchid)
		staffid = info.validated_data['staffid']
		servicess = info.validated_data['services']
		date = info.validated_data['date']
		time = info.validated_data['time']

		sel_branch = Branch.objects.get(id=int(branchid))
		sel_staff = User.objects.get(id=int(staffid))

		create_order=order.objects.create(branch=sel_branch,staff=sel_staff,appointment_date=date,appointment_time=time,customer=request.user)

		get_services_list = list(json.loads(servicess))

		for x in get_services_list:
			sel_ser = Service.objects.get(id=int(x))
			order_services.objects.create(order_ref = create_order,servic_ref=sel_ser)



		return Response({'status':'placed'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_services_list(request):
	info = get_staff_id(data=request.data)

	if info.is_valid():
		sel_user = User.objects.get(id=int(info.validated_data['identify']))
		sel = track_service_providers.objects.filter(provider = sel_user )

		res = []

		for x in sel:
			res.append({'id':x.service.id,'name':x.service.title})

		return Response(res)

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_staff(request):
	info = get_branch_id(data=request.data)

	if info.is_valid():
		identify = info.validated_data['identify']

		sel_branch = Branch.objects.get(id=int(identify))
		get_staffs = BranchEmployee.objects.filter(branch_name=sel_branch)

		res = []

		for x in get_staffs:
			res.append({'id':x.staff.id,'name':x.staff.first_name+' '+x.staff.last_name})


		return Response(res)


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_stock_data(request):

	branchid = get_branch_id(data=request.data)
	if branchid.is_valid():
		get_id = branchid.validated_data['identify']

	info = []
	items = product_items.objects.all()

	for x in items:
		if int(get_id) == 0:
			get_data = buy_items.objects.filter(item = x)
		else:
			getb = Branch.objects.get(id=int(get_id))
			get_data = buy_items.objects.filter(item = x,branch=getb)

		name = x.name
		quantity = 0
		if len(get_data) != 0:
			for q in get_data:
				quantity = q.quantity + quantity
			value =round(float(quantity * x.price),2)
			date = get_data.reverse()[0].date

		else:
			value = 0
			date = 'N/A'

		info.append({'name':name,'quantity':quantity,'value':value,'date':date})

	return Response(info)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_to_stock(request):
	info = add_Stock(data=request.data)

	if info.is_valid():
		sel_item = product_items.objects.get(id=int(info.validated_data['itemid']))
		sel_provider = providers.objects.get(id=int(info.validated_data['providerid']))
		sel_branch = Branch.objects.get(id=int(info.validated_data['branchid']))

		buy_items.objects.create(item = sel_item , provider = sel_provider , quantity = info.validated_data['quantity'],branch = sel_branch)

		return Response({'status':'created'})

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_items_provider_list(request):
	info = {'items':[],'providers':[],'branch':[]}

	items=product_items.objects.all()

	for x in items:
		info['items'].append({'id':x.id,'name':x.name})

	provid = providers.objects.all()

	for x in provid:
		info['providers'].append({'id':x.id,'name':x.name})

	branches = Branch.objects.all()

	for x in branches:
		info['branch'].append({'id':x.id,'name':x.name})



	return Response(info)



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
	
	