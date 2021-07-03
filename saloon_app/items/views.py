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
from django.core.mail import send_mail
from django.db.models import Q,Sum
import json
from .models import *
from authentication.models import User


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def sales_report(request):
	info=salesreport(data=request.data)

	if info.is_valid():
		branchid = info.validated_data['branchid']
		fromdate = info.validated_data['fromdate']
		todate = info.validated_data['todate']


		res = []
		this_services =''
		this_items =''
		total_cost=0


		if branchid == 0:
			filter_orders = order.objects.filter(Q(date__gte=fromdate) & Q(date__lte=todate) & Q(status='approved'))

			for x in filter_orders:
				f=order_services.objects.filter(order_ref=x)

				for y in f:
					this_services = this_services+' , '+y.servic_ref.title
					total_cost = total_cost + y.servic_ref.cost


				filteritems = order_items.objects.filter(order_ref=x)

				for z in filteritems:
					this_items = this_items+' , '+z.item_ref.name
					total_cost = total_cost+z.item_ref.sale_price

				this_services=this_services[2:]
				this_items = this_items[2:]


				res.append({'id':x.id,'branch':x.branch.name,'date':x.date,'staff':x.staff.first_name+''+x.staff.last_name,'services':this_services,'items':this_items,'cost':total_cost})

			return Response(res)



		if branchid != 0:
			sel_branch = Branch.objects.get(id=int(branchid))
			filter_orders = order.objects.filter(Q(date__gte=fromdate) & Q(date__lte=todate) & Q(status='approved') & Q(branch=sel_branch))

			for x in filter_orders:
				f=order_services.objects.filter(order_ref=x)

				for y in f:
					this_services = this_services+' , '+y.servic_ref.title
					total_cost = total_cost + y.servic_ref.cost


				filteritems = order_items.objects.filter(order_ref=x)

				for z in filteritems:
					this_items = this_items+' , '+z.item_ref.name
					total_cost = total_cost+z.item_ref.sale_price

				this_services=this_services[2:]
				this_items = this_items[2:]


				res.append({'id':x.id,'branch':x.branch.name,'date':x.date,'staff':x.staff.first_name+''+x.staff.last_name,'services':this_services,'items':this_items,'cost':total_cost})

			return Response(res)




















@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_order(request):
	info = update_order_id(data=request.data)

	if info.is_valid():
		orderid = info.validated_data['orderid']
		modified_services = list(json.loads(info.validated_data['modified_services']))
		modified_items = list(json.loads(info.validated_data['modified_items']))
		modified_status = info.validated_data['modified_status']
		modified_time = info.validated_data['modified_time']


		sel = order.objects.get(id=int(orderid))
		service_cost = 0
		item_cost = 0
		

		if modified_time != None:

			if sel.appointment_time != modified_time:
				sel.appointment_time = modified_time
			
		if modified_status != None:
			if sel.status != modified_status:
				if modified_status != 'approved':

					sel.status = modified_status

		sel.save()

		if len(modified_services) != 0 and modified_services != None and modified_services != '':

			filter_services = order_services.objects.filter(order_ref=sel)

			if(len(filter_services)!=0):

				for x in filter_services:
					x.delete()


			for x in modified_services:
				sel_service = Service.objects.get(id=int(x))

				order_services.objects.create(order_ref=sel,servic_ref=sel_service)

				service_cost = service_cost + sel_service.cost



		if len(modified_items) != 0 and modified_items != None and modified_items != '':

			filter_items = order_items.objects.filter(order_ref=sel)

			if len(filter_items) != 0:
				for i in filter_items:
					i.delete()


			for item in modified_items:
				sel_item = product_items.objects.get(id=int(item))
				order_items.objects.create(order_ref=sel,item_ref=sel_item)
				item_cost = item_cost + sel_item.sale_price


		

		if modified_status == 'approved':

			



			
			filter_itemss = order_items.objects.filter(order_ref=sel)

			for x in filter_itemss:
				item_cost = item_cost+(x.item_ref.sale_price)


			filter_servicess = order_services.objects.filter(order_ref=sel)

			for x in filter_servicess:
				service_cost = service_cost + (x.servic_ref.cost)



			sel_user_id = sel.customer.id

			orderedUser = User.objects.get(id=int(sel_user_id))

			balance = orderedUser.balance

			if(int(balance)<int((service_cost+item_cost))):
				return Response({'status':'failed'})

			else:
				sel = order.objects.get(id=int(orderid))
				sel.status = 'approved'
				sel.save()




			sel_user_for_updating = User.objects.get(id=int(sel_user_id))

			try:
				send_mail(
						    'Your order has been approved !',
						    'Congratulations ! your order has been approved.Please visit the saloon as scheduled',
						    'itechverser22@gmail.com',
						    [sel_user_for_updating.email],
						    fail_silently=False,
						)

			except:
				pass

			sel_user_for_updating.balance = sel_user_for_updating.balance - (service_cost+item_cost)
			sel_user_for_updating.save()





			



		return Response({'status':'updated'})













@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_order_details(request):
	info = order_id(data=request.data)

	if info.is_valid():
		sel = order.objects.get(id=int(info.validated_data['orderid']))

		res = {'id':'','services':[],'items':[],'time':'','status':'','available_items':[],'available_services':[]}

		get_branch = sel.branch

		res['id'] = sel.id
		res['status']=sel.status
		res['time']=sel.appointment_time

		filter_services = order_services.objects.filter(order_ref=sel)

		for serv in filter_services:
			serviceid=serv.servic_ref.id
			servicename=serv.servic_ref.title
			res['services'].append({'id':serviceid,'title':servicename})


		filter_items = order_items.objects.filter(order_ref=sel)

		for item in filter_items:
			itemid = item.item_ref.id
			itemname = item.item_ref.name

			res['items'].append({'id':itemid,'name':itemname})


		sel_branch = get_branch

		sels = buy_items.objects.filter(branch=sel_branch)

		

		get_servs = product_items.objects.all()

		for x in get_servs:
			filter_this_item = sels.filter(item=x)

			if len(filter_this_item) > 0 and int(sels.filter(item=x).aggregate(plus = Sum('quantity'))['plus'])>0:
				res['available_items'].append({'id':x.id,'name':x.name})

			else:
				pass

		filter_services = track_service_providers.objects.filter(provider=sel.staff)

		for x in filter_services:
			res['available_services'].append({'id':x.service.id,'title':x.service.title})





		return Response(res)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_items_list(request):
	info = get_branch_id(data=request.data)
	if info.is_valid():
		print('your branch id is',info.validated_data['identify'])
		sel_branch = Branch.objects.get(id=int(info.validated_data['identify']))
		sel = buy_items.objects.filter(branch=sel_branch)

		res = []

		get_servs = product_items.objects.all()

		for x in get_servs:
			filter_this_item = sel.filter(item=x)

			if len(filter_this_item) > 0 and int(sel.filter(item=x).aggregate(plus = Sum('quantity'))['plus'])>0:
				res.append({'id':x.id,'name':x.name})

			else:
				pass


		return Response(res)


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_services(request):
	info = get_branch_id(data=request.data)
	if info.is_valid():
		branchid=info.validated_data['identify']

		sel_branch = Branch.objects.get(id=int(branchid))

		filter_employees= BranchEmployee.objects.filter(branch_name=sel_branch)

		service_ids = []

		for user in  filter_employees:
			get_staff = user.staff

			get_all_services=track_service_providers.objects.filter(provider = get_staff)

			for identify in get_all_services:
				service_ids.append(identify.service.id)



		unique_service_id = set(service_ids)

		unique_service_ids = []

		for x in unique_service_id:
			unique_service_ids.append(x)

		available_services = []

		for x in unique_service_ids:
			sel = Service.objects.get(id=int(x))
			available_services.append({'id':sel.id,'name':sel.title})


		return Response(available_services)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_upcomming_appointment(request):
	filtr = order.objects.filter(Q(appointment_date__gte=datetime.now()) & Q(staff = request.user))

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
	current_items = ""
	find_orders=order.objects.filter(customer=request.user)

	for x in find_orders:
		get_services = order_services.objects.filter(order_ref=x)

		for ser in get_services:
			current_services = current_services +' , '+ser.servic_ref.title

		current_services = current_services[2:]

		get_items = order_items.objects.filter(order_ref=x)
		if len(get_items)!=0:
			for i in get_items:
				current_items = current_items+' , '+i.item_ref.name

			current_items = current_items[2:]


		res.append({'id':x.id,'date':x.appointment_date,'time':x.appointment_time,'branch':x.branch.name,'staff':x.staff.first_name+' '+x.staff.last_name,'services':current_services,'status':x.status,'ordered_items':current_items,'balance':request.user.balance})


	return Response(res)








@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def place_order(request):
	info = get_order_data(data=request.data)

	if info.is_valid() :
		branchid = info.validated_data['branchid']

		get_email = info.validated_data['email']

		cus = ''

		try:
			cus=User.objects.get(email=get_email)

		except:
			cus = request.user





		
		staffid = info.validated_data['staffid']
		servicess = info.validated_data['services']
		items = info.validated_data['items']
		date = info.validated_data['date']
		time = info.validated_data['time']

		sel_branch = Branch.objects.get(id=int(branchid))
		sel_staff = User.objects.get(id=int(staffid))

		create_order=order.objects.create(branch=sel_branch,staff=sel_staff,appointment_date=date,appointment_time=time,customer=cus)

		get_services_list = list(json.loads(servicess))

		for x in get_services_list:
			sel_ser = Service.objects.get(id=int(x))
			order_services.objects.create(order_ref = create_order,servic_ref=sel_ser)


		get_item_list = list(json.loads(items))

		if len(get_item_list) != 0:
			for x in get_item_list:
				sel_item = product_items.objects.get(id=int(x))
				order_items.objects.create(order_ref=create_order,item_ref=sel_item)

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
		sale_price = info.validated_data['sale_price']
		commision = info.validated_data['commision']
		target = info.validated_data['target']


		sel_item = product_items.objects.get(id=int(identify))

		sel_cat = item_category.objects.get(id=int(cat))

		if sel_item.name != name:
			sel_item.name = name


		if sel_item.price != price:
			sel_item.price = price


		if sel_item.category != sel_cat:
			sel_item.category = sel_cat

		if sel_item.sale_price != sale_price:
			sel_item.sale_price = sale_price


		if sel_item.commision != commision:
			sel_item.commision = commision

		if sel_item.target != target:
			sel_item.target = target


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
		info['item_info']['sale_price'] = sel.sale_price
		info['item_info']['commision'] = sel.commision
		info['item_info']['target'] = sel.target


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

		target = float(data.validated_data['target'])
		commision = float(data.validated_data['commision'])

		selcat = item_category.objects.get(id=int(catid))
		sale_price = data.validated_data['sale_price']

		p=product_items.objects.create(name=name,price=price,category=selcat,sale_price=sale_price,commision=commision,target=target)

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
	
	