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
def change_stock_status(request):
	info = stock_status(data=request.data)

	if info.is_valid():
		transfer_id = info.validated_data['transfer_id']
		status = info.validated_data['status']

		sel_stock = stock_transfer.objects.get(id=int(transfer_id))


		if status != 'confirmed':
			sel_stock.status = status

			sel_stock.save()


		else:

			buy_items.objects.create(item=sel_stock.item,branch=sel_stock.frombranch,quantity=-(int(sel_stock.quantity)))
			buy_items.objects.create(item=sel_stock.item,branch=sel_stock.tobranch,quantity=(int(sel_stock.quantity)))
			sel_stock = stock_transfer.objects.get(id=int(transfer_id))
			sel_stock.status = status
			sel_stock.save()



		return Response({'status':'transfered'})






@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_stock_transfer_data(request):
	res = []
	getBranchid = BranchEmployee.objects.get(staff=request.user).branch_name.id

	sel_branch = Branch.objects.get(id=int(getBranchid))

	sel = stock_transfer.objects.filter(Q(frombranch=sel_branch) | Q(tobranch=sel_branch))[:30]

	for x in sel:
		branchname = ''
		branchid = ''
		sender = True

		if x.frombranch == sel_branch:
			branchid=x.tobranch.id
			branchname = x.tobranch.name
			sender = True

		else:
			branchid = x.frombranch.id
			branchname = x.frombranch.name
			sender = False

		res.append({'transfer_id':x.id,'branch_id':branchid,'branchname':branchname,'item_id':x.item.id,'itemname':x.item.name,'quantity':x.quantity,'date':x.date,'status':x.status,'sender':sender})


	return Response(res)







@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def item_stock_transfer(request):
	info = stock_transfer_data(data=request.data)

	if info.is_valid():
		frombranch = info.validated_data['frombranch']
		tobranch = info.validated_data['tobranch']
		quantity = info.validated_data['quantity']
		selected_item = info.validated_data['selected_item']


		stock_transfer.objects.create(


			frombranch = Branch.objects.get(id=int(frombranch)),
			tobranch = Branch.objects.get(id=int(tobranch)),
			quantity = int(quantity),
			item = product_items.objects.get(id=int(selected_item))




			)


		return Response({'status':'created'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_my_orders(request):
	res = []
	current_services=""
	current_items = ""
	find_orders=order.objects.filter(staff=request.user)

	print('your orders',find_orders)

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




		res.append({'id':x.id,'date':x.appointment_date,'time':x.appointment_time,'branch':x.branch.name,'staff':x.staff.first_name+' '+x.staff.last_name,'services':current_services,'payment_status':x.payment_status,'status':x.status,'ordered_items':current_items,'balance':request.user.balance,'user':x.customer.first_name,'payment_method':x.payment_method})

		current_services = ""
		current_items = ""


	res.reverse()

	res = res[:30]


	return Response(res)






@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_balance(request):
	return Response({'balance':request.user.balance})

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def sales_report(request):
	info=salesreport(data=request.data)

	if info.is_valid():
		branchid = info.validated_data['branchid']
		fromdate = info.validated_data['fromdate']
		todate = info.validated_data['todate']
		staffid = info.validated_data['staffid']
		
		commonth = info.validated_data['commonth']

		
		print('your commmin month is',commonth)




		res = []
		this_services =''
		this_items =''
		total_cost=0

		commision_data = []


		if branchid == 0:
			filter_orders = order.objects.filter(Q(date__gte=fromdate) & Q(date__lte=todate) & Q(status='completed'))

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


				res.append({'id':x.id,'branch':x.branch.name,'date':x.date,'staff':x.staff.first_name+''+x.staff.last_name,'services':this_services,'items':this_items,'cost':total_cost,'staff_list':[],'commision_data':commision_data})

				this_services = ''
				this_items = ''

				total_cost = 0

			return Response(res)



		if branchid != 0:
			sel_branch = Branch.objects.get(id=int(branchid))
			get_staffs = BranchEmployee.objects.filter(branch_name=sel_branch)

			if staffid ==0:
				filter_orders = order.objects.filter(Q(date__gte=fromdate) & Q(date__lte=todate) & Q(status='completed') & Q(branch=sel_branch))

			else:

				if commonth != 0 and commonth != None and commonth != '':
					year = commonth.split('-')[0]
					month = commonth.split('-')[1]

					

					sel_staff_user = User.objects.get(id=int(staffid))

					filter_services_month = order_services.objects.filter(Q(order_ref__date__gte=str(year)+'-'+str(month)+'-'+'01') & Q(order_ref__date__lte=str(year)+'-'+str(month)+'-'+'31') & Q(order_ref__staff=sel_staff_user) & Q(order_ref__status='completed'))
					filter_items_month = order_items.objects.filter(Q(order_ref__date__gte=str(year)+'-'+str(month)+'-'+'01') & Q(order_ref__date__lte=str(year)+'-'+str(month)+'-'+'31') & Q(order_ref__staff=sel_staff_user) & Q(order_ref__status='completed'))

					all_services = Service.objects.all()
					all_items = product_items.objects.all()




					for ser in all_services:

						cost = ser.cost
						total_costing=0
						title = ser.title
						total_provided = 0
						commision = ser.servicecommision
						commision_value = 'N/A'
						monthlytarget = ser.monthlytarget
						target_status = 'Not reached'

						staff_name = sel_staff_user.first_name+' '+sel_staff_user.last_name

						total_ordered = len(filter_services_month.filter(servic_ref=ser))

						if total_ordered != 0:
							total_provided = total_ordered
							total_costing = cost*total_provided

							if total_costing > monthlytarget or total_costing == monthlytarget:
								target_status = 'Reached'
								commision_value = cost * 0.01 * commision


						commision_data.append({'staff_name':staff_name,'service_name':title,'total_sale':total_costing,'commision_rate':commision,'commision_value':commision_value,'target_status':target_status})




						#item selling commision data will be there


					for it in all_items:

						cost = it.sale_price
						total_costing=0
						title = it.name
						total_provided = 0
						commision = it.commision
						commision_value = 'N/A'
						monthlytarget = it.target
						target_status = 'Not reached'

						staff_name = sel_staff_user.first_name+' '+sel_staff_user.last_name

						total_ordered = len(filter_items_month.filter(item_ref=it))

						if total_ordered != 0:
							total_provided = total_ordered
							total_costing = cost*total_provided

							if total_costing > monthlytarget or total_costing == monthlytarget:
								target_status = 'Reached'
								commision_value = cost * 0.01 * commision


						commision_data.append({'staff_name':staff_name,'service_name':title,'total_sale':total_costing,'commision_rate':commision,'commision_value':commision_value,'target_status':target_status})


						#end of item selling commision data settings
							




					

						



				else:
					pass
				filter_orders = order.objects.filter(Q(date__gte=fromdate) & Q(date__lte=todate) & Q(status='completed') & Q(branch=sel_branch) & Q(staff=User.objects.get(id=int(staffid))))


			employee_list = []

			for em in get_staffs:
				if (em.staff.is_manager == True or em.staff.is_admin == True or em.staff.is_superuser == True):
					pass
				else:
					employee_list.append({'id':em.staff.id,'name':em.staff.first_name})

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


				res.append({'id':x.id,'branch':x.branch.name,'date':x.date,'staff':x.staff.first_name+''+x.staff.last_name,'services':this_services,'items':this_items,'cost':total_cost,'staff_list':employee_list,'commision_data':commision_data})

				this_services = ''
				this_items = ''
				total_cost=0

			if len(filter_orders) == 0:
				res.append({'staff_list':employee_list,'commision_data':commision_data})

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
		modified_payment_method = info.validated_data['modified_payment_method']
		modified_payment_status = info.validated_data['modified_payment_status']


		sel = order.objects.get(id=int(orderid))
		service_cost = 0
		item_cost = 0
		

		if modified_time != None:

			if sel.appointment_time != modified_time:
				sel.appointment_time = modified_time
			
		if modified_status != None:
			if sel.status != modified_status:
				if modified_status != 'completed':

					sel.status = modified_status

		if modified_payment_method != None:
			if sel.payment_method != modified_payment_method:

				sel.payment_method = modified_payment_method


		if modified_payment_status != None:
			if sel.payment_status != modified_payment_status:
				sel.payment_status = modified_payment_status


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


		

		if modified_status == 'completed':

			



			
			filter_itemss = order_items.objects.filter(order_ref=sel)

			for x in filter_itemss:
				item_cost = item_cost+(x.item_ref.sale_price)+(x.item_ref.sale_price*0.01*x.item_ref.taxes)


			filter_servicess = order_services.objects.filter(order_ref=sel)

			for x in filter_servicess:
				service_cost = service_cost + (x.servic_ref.cost)+(x.servic_ref.cost*0.01*x.servic_ref.taxes)



			sel_user_id = sel.customer.id

			orderedUser = User.objects.get(id=int(sel_user_id))

			balance = orderedUser.balance

			if(int(balance)<int((service_cost+item_cost)) and sel.payment_method == 'voucher'):
				if sel.payment_method == 'voucher':
					return Response({'status':'failed'})

				else:
					pass

			elif sel.payment_method == 'voucher' and int(balance)>int(service_cost+item_cost):
				sel = order.objects.get(id=int(orderid))
				sel.status = 'completed'
				sel.save()
				sel_user_for_updating = User.objects.get(id=int(sel_user_id))
				sel_user_for_updating.balance = sel_user_for_updating.balance - (service_cost+item_cost)
				sel_user_for_updating.save()



			else:
				sel = order.objects.get(id=int(orderid))
				sel.status = 'completed'
				sel.save()





			

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

			





			



		return Response({'status':'updated'})













@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_order_details(request):
	info = order_id(data=request.data)

	if info.is_valid():
		sel = order.objects.get(id=int(info.validated_data['orderid']))

		res = {'id':'','services':[],'items':[],'time':'','status':'','available_items':[],'available_services':[],'payment_method':'','payment_status':''}

		get_branch = sel.branch

		res['id'] = sel.id
		res['status']=sel.status
		res['time']=sel.appointment_time
		res['payment_method'] = sel.payment_method,
		res['payment_status'] = sel.payment_status

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
				res.append({'id':x.id,'name':x.name,'price':x.sale_price,'taxes':x.taxes})

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
		res = []

		for user in  filter_employees:
			get_staff = user.staff

			get_all_services=track_service_providers.objects.filter(provider = get_staff)

			for identify in get_all_services:
				service_ids.append(identify.service.id)
				res.append({'id':identify.service.id,'name':identify.service.title,'cost':identify.service.cost,'staffid':identify.provider.id,'staffname':identify.provider.first_name+' '+identify.provider.last_name,'taxes':identify.service.taxes})




		unique_service_id = set(service_ids)

		unique_service_ids = []

		for x in unique_service_id:
			unique_service_ids.append(x)

		available_services = []

		for x in unique_service_ids:
			sel = Service.objects.get(id=int(x))
			available_services.append({'id':sel.id,'name':sel.title,'cost':sel.cost})


		return Response(res)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_upcomming_appointment(request):
	try:
		info = get_daterange(data=request.data)
		if info.is_valid():

			print(info.validated_data['date'])

		else :
			print('not valid')
	except:
		filtr = order.objects.filter(Q(appointment_date__gte=datetime.now()) & Q(staff = request.user))
		info = []

		for x in filtr:
			if x not in info:
				info.append({'date':x.appointment_date,'time':x.appointment_time.strftime("%I:%M %p"),'roundtime':str(x.appointment_time).split(':')[0]+':00:00','weekday':str(x.appointment_date.strftime("%A"))})


		return Response(info)

	filtr = order.objects.filter(Q(appointment_date__gte=datetime.now()) & Q(staff = request.user))


	try:
		date = info.validated_data['date']
		formatted = date.replace(' ','').split(',')
		year = ''
		month = ''
		day = ''

		


		

		if date != None:

			year = formatted[1][-4:]

			for x in formatted[0]:
				if x.isdigit() == True:
					day = day+str(x)

			print('selected day is ',day)

			
			



			if  'JANUARY' in (formatted[0]).upper():
				month = 1
			if 'FEBRUARY' in (formatted[0]).upper():
				month = 2

			if 'MARCH' in (formatted[0]).upper():
				month = 3

			if 'APRIL' in (formatted[0]).upper():
				month = 4

			if 'MAY' in (formatted[0]).upper():
				month = 5

			if 'JUNE' in (formatted[0]).upper():
				month = 6

			if 'JULY' in (formatted[0]).upper():
				month = 7

			if 'AUGUST' in (formatted[0]).upper():
				month = 8

			if 'SEPTEMBER' in (formatted[0]).upper():
				month = 9

			if 'OCTOBER' in (formatted[0]).upper():
				month = 10

			if 'NOVEMBER' in (formatted[0]).upper():
				month = 11

			if 'DECEMBER' in (formatted[0]).upper():
				month = 12


			print('your date is ',str(year)+'-'+str(month)+'-'+str(day))
			

			

			filtr = order.objects.filter(Q(appointment_date=str(year)+'-'+str(month)+'-'+str(day)) & Q(staff = request.user))
			info = []

			for x in filtr:
				if x not in info:
					info.append({'date':x.appointment_date,'time':x.appointment_time.strftime("%I:%M %p"),'roundtime':str(x.appointment_time).split(':')[0]+':00:00','weekday':str(x.appointment_date.strftime("%A"))})


			return Response(info)

	except:
		pass



	try:
		date = info.validated_data['date']
		formatted = date.replace(' ','').split('–')
		year = ''
		month = ''
		day = ''

		nextmonth=''


		nextday = ''

		if len(formatted[1]) <= 7:

			year = formatted[1][-4:]
			day = formatted[0][3:]
			nextday = formatted[1].split(',')[0]



			if (formatted[0][:3]).upper() == 'JAN':
				month = 1
			if (formatted[0][:3]).upper() == 'FEB':
				month = 2

			if (formatted[0][:3]).upper() == 'MAR':
				month = 3

			if (formatted[0][:3]).upper() == 'APR':
				month = 4

			if (formatted[0][:3]).upper() == 'MAY':
				month = 5

			if (formatted[0][:3]).upper() == 'JUN':
				month = 6

			if (formatted[0][:3]).upper() == 'JUL':
				month = 7

			if (formatted[0][:3]).upper() == 'AUG':
				month = 8

			if (formatted[0][:3]).upper() == 'SEP':
				month = 9

			if (formatted[0][:3]).upper() == 'OCT':
				month = 10

			if (formatted[0][:3]).upper() == 'NOV':
				month = 11

			if (formatted[0][:3]).upper() == 'DEC':
				month = 12


			print('your date is ',str(year)+'-'+str(month)+'-'+str(day))
			print('your next date is ',str(year)+'-'+str(month)+'-'+str(nextday))

			minimumrange=str(year)+'-'+str(month)+'-'+str(day)
			maximumrange = str(year)+'-'+str(month)+'-'+str(nextday)

			filtr = order.objects.filter(Q(appointment_date__gte=minimumrange) & Q(staff = request.user) & Q(appointment_date__lte=maximumrange))
			info = []

			for x in filtr:
				if x not in info:
					info.append({'date':x.appointment_date,'time':x.appointment_time.strftime("%I:%M %p"),'roundtime':str(x.appointment_time).split(':')[0]+':00:00','weekday':str(x.appointment_date.strftime("%A"))})


			return Response(info)


		if len(formatted[1]) > 7:

			year = formatted[1][-4:]
			day = formatted[0][3:]
			nextday = formatted[1].split(',')[0][3:]
			

			if (formatted[0][:3]).upper() == 'JAN':
				month = 1
			if (formatted[0][:3]).upper() == 'FEB':
				month = 2

			if (formatted[0][:3]).upper() == 'MAR':
				month = 3

			if (formatted[0][:3]).upper() == 'APR':
				month = 4

			if (formatted[0][:3]).upper() == 'MAY':
				month = 5

			if (formatted[0][:3]).upper() == 'JUN':
				month = 6

			if (formatted[0][:3]).upper() == 'JUL':
				month = 7

			if (formatted[0][:3]).upper() == 'AUG':
				month = 8

			if (formatted[0][:3]).upper() == 'SEP':
				month = 9

			if (formatted[0][:3]).upper() == 'OCT':
				month = 10

			if (formatted[0][:3]).upper() == 'NOV':
				month = 11

			if (formatted[0][:3]).upper() == 'DEC':
				month = 12


			#setting for next month selection
			if (formatted[1].split(',')[0][:3]).upper() == 'JAN':
				nextmonth = 1
			if (formatted[1].split(',')[0][:3]).upper() == 'FEB':
				nextmonth = 2

			if (formatted[1].split(',')[0][:3]).upper() == 'MAR':
				nextmonth = 3

			if (formatted[1].split(',')[0][:3]).upper() == 'APR':
				nextmonth = 4

			if (formatted[1].split(',')[0][:3]).upper() == 'MAY':
				nextmonth = 5

			if (formatted[1].split(',')[0][:3]).upper() == 'JUN':
				nextmonth = 6

			if (formatted[1].split(',')[0][:3]).upper() == 'JUL':
				nextmonth = 7

			if (formatted[1].split(',')[0][:3]).upper() == 'AUG':
				nextmonth = 8

			if (formatted[1].split(',')[0][:3]).upper() == 'SEP':
				nextmonth = 9

			if (formatted[1].split(',')[0][:3]).upper() == 'OCT':
				nextmonth = 10

			if (formatted[1].split(',')[0][:3]).upper() == 'NOV':
				nextmonth = 11

			if (formatted[0][:3]).upper() == 'DEC':
				nextmonth = 12

			minimumrange=str(year)+'-'+str(month)+'-'+str(day)
			maximumrange = str(year)+'-'+str(nextmonth)+'-'+str(nextday)
			print('from',str(year)+'-'+str(month)+'-'+str(day))
			print('to',str(year)+'-'+str(nextmonth)+'-'+str(nextday))
			print('formatted data ',formatted)
			filtr = order.objects.filter(Q(appointment_date__gte=minimumrange) & Q(staff = request.user) & Q(appointment_date__lte=maximumrange))
			info =[]
			for x in filtr:
				if x not in info:

					info.append({'date':x.appointment_date,'time':x.appointment_time.strftime("%I:%M %p"),'roundtime':str(x.appointment_time).split(':')[0]+':00:00','weekday':str(x.appointment_date.strftime("%A"))})


			return Response(info)

	except:
		
		for x in filtr:

			if x not in info:
				info.append({'date':x.appointment_date,'time':x.appointment_time.strftime("%I:%M %p"),'roundtime':str(x.appointment_time).split(':')[0]+':00:00','weekday':str(x.appointment_date.strftime("%A"))})


		return Response(info)




	







@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def order_details(request):
	res = []
	current_services=""
	current_items = ""
	find_orders=order.objects.filter(customer=request.user)

	print('your orders',find_orders)

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




		res.append({'id':x.id,'date':x.appointment_date,'time':x.appointment_time,'branch':x.branch.name,'staff':x.staff.first_name+' '+x.staff.last_name,'services':current_services,'payment_status':x.payment_status,'status':x.status,'ordered_items':current_items,'balance':request.user.balance})

		current_services = ""
		current_items = ""


	return Response(res)








@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def place_order(request):
	info = get_order_data(data=request.data)

	print(info)

	if info.is_valid() :
		branchid = info.validated_data['branchid']


		try:
			get_email = info.validated_data['email']

		except:
			pass

		cus = ''

		try:
			cus=User.objects.get(email=get_email)

		except:
			cus = request.user





		
		staffid = list(json.loads(info.validated_data['staffid']))
		servicess = list(json.loads(info.validated_data['services']))
		items = list(json.loads(info.validated_data['items']))
		try:
			date = info.validated_data['date']
			time = info.validated_data['time']
		except:
			pass

		try:
			itemforservice = list(json.loads(info.validated_data['itemforservice']))
		except:
			pass

		try:
			paymentsystem = ''
			payment_type = info.validated_data['payment_type']
			if payment_type != 'voucher':
				paymentsystem = 'cash'

			if payment_type == 'zero':
				payment_type = 'due'
				paymentsystem = 'cash'
			if payment_type == 'voucher':
				paymentsystem='voucher'

		except:
			pass


		try:
			payment_stats = ''

			if payment_type == 'voucher':
				payment_stats = 'paid'

			if payment_type == 'partial':
				payment_stats = 'partial'

			if payment_type == 'cash':
				payment_stats = 'paid'

			if payment_type == 'due':
				payment_stats='due'


		except:
			pass

		sel_branch = Branch.objects.get(id=int(branchid))



		unique_staffs = list(set(staffid))


		if request.user.is_staff == True:

			for x in unique_staffs:

				print('payment stats is ',payment_stats,'order_type ',payment_type)
				sel_staff = User.objects.get(id=int(x))
				create_order=order.objects.create(branch=sel_branch,staff=sel_staff,appointment_date=date,appointment_time=time,customer=cus,payment_method=paymentsystem,payment_status=payment_stats)

				find_index_of_service = []

				for index,staff in enumerate(staffid):
					if int(staff) == int(x):
						find_index_of_service.append(index)


				my_ordered_services = []

				for ind in find_index_of_service:
					my_ordered_services.append(servicess[ind])



				for orde in my_ordered_services:
					sel_serv = Service.objects.get(id=int(orde))
					order_services.objects.create(order_ref = create_order,servic_ref=sel_serv)




			if len(items) != 0:
				create_order=order.objects.create(branch=sel_branch,staff=request.user,appointment_date=date,appointment_time=time,customer=cus,payment_method = paymentsystem,payment_status=payment_stats)

				for x in items:
					sel_item = product_items.objects.get(id=int(x))
					order_items.objects.create(order_ref=create_order,item_ref=sel_item)


			return Response({'status':'placed'})








		print('your unique_staffs are ',unique_staffs)

		for x in unique_staffs:
			print('looping')
			sel_staff = User.objects.get(id=int(x))
			create_order=order.objects.create(branch=sel_branch,staff=sel_staff,appointment_date=date,appointment_time=time,customer=cus,payment_method='voucher',payment_status='due')

			find_index_of_service = []

			for index,staff in enumerate(staffid):
				if int(staff) == int(x):
					find_index_of_service.append(index)


			my_ordered_services = []

			for ind in find_index_of_service:
				my_ordered_services.append(servicess[ind])



			for orde in my_ordered_services:
				sel_serv = Service.objects.get(id=int(orde))
				order_services.objects.create(order_ref = create_order,servic_ref=sel_serv)


			if len(items) != 0:

				for index,itemid in enumerate(items):

					if itemforservice[index] in my_ordered_services:
						sel_item = product_items.objects.get(id=int(itemid))
						order_items.objects.create(order_ref=create_order,item_ref=sel_item)



			find_index_of_service = []
			my_ordered_services = []



		return Response({'status':'placed'})














		'''
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


		'''


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
		taxes = info.validated_data['taxes']


		sel_item = product_items.objects.get(id=int(identify))

		sel_cat = item_category.objects.get(id=int(cat))

		if sel_item.name != name:
			sel_item.name = name

		if sel_item.taxes != taxes:
			sel_item.taxes = int(taxes)

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
		info['item_info']['taxes'] = sel.taxes


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

		taxes = data.validated_data['taxes']

		catid = data.validated_data['cat']

		target = float(data.validated_data['target'])
		commision = float(data.validated_data['commision'])

		selcat = item_category.objects.get(id=int(catid))
		sale_price = data.validated_data['sale_price']

		p=product_items.objects.create(name=name,price=price,category=selcat,sale_price=sale_price,commision=commision,target=target,taxes=taxes)

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
	
	