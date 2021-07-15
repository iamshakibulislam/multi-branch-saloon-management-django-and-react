from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from companybranch.models import Branch,BranchEmployee
from .models import *
from items.models import *
from marketing.models import *
from authentication.models import User
from django.db.models import Q
import json

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def my_orders(request):
	info = orders_from_date(data=request.data)
	if info.is_valid():
		get_date = info.validated_data['date']

		filtering = order.objects.filter(appointment_date=get_date,staff=request.user)

		res = []

		tmp_services = ''
		tmp_items = ''

		for x in filtering:
			sel_ser = order_services.objects.filter(order_ref=x)
			for ser in sel_ser:
				tmp_services=tmp_services+' , '+ser.servic_ref.title

			sel_items = order_items.objects.filter(order_ref=x)

			if len(sel_items) == 0:
				tmp_items = 'No Items'

			else:
				for i in sel_items:
					tmp_items = tmp_items+' , '+i.item_ref.name
			tmp_services = tmp_services[2:]
			tmp_items = tmp_items[2:]

			res.append({'id':x.id,'user':x.customer.first_name + x.customer.last_name,'date':x.date,'time':x.appointment_time,'services':tmp_services,'items':tmp_items,'status':x.status})
			tmp_services = ''
			tmp_items = ''


	return Response(res)






@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_services_staff(request):
	info = service_staff(data=request.data)

	if info.is_valid():
		get_service_list = list(json.loads(info.validated_data['service_ids']))

		branchid = info.validated_data['branch']
		sel_branch = Branch.objects.get(id=int(branchid))

		filter_emp = BranchEmployee.objects.filter(branch_name=sel_branch)

		emp_list = []

		for x in filter_emp:
			emp_list.append(x.staff)


		res = []

		for em in emp_list:
			filter_employee_services=track_service_providers.objects.filter(provider=em).filter(service__id__in=get_service_list)

			if len(filter_employee_services) == len(get_service_list):
				res.append({'id':em.id,'name':em.first_name+' '+em.last_name})

			else :
				pass


		return Response(res)




			













@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def updateInfo(request):
	info = updateUser(data=request.data)

	if info.is_valid():

		first_name = info.validated_data['first_name']
		print('your first name is ',first_name)
		last_name = info.validated_data['last_name']
		print('last name ',last_name)
		
		is_staff = info.validated_data['is_staff']
		is_manager = info.validated_data['is_manager']
		is_admin = info.validated_data['is_admin']
	

		email = info.validated_data['email']
		print('your email is here ',email)
		
		username = info.validated_data['username']

		password = info.validated_data['password']


		dob = info.validated_data['dob']

		service = info.validated_data['service']
		workday = info.validated_data['workday']
		time_from = info.validated_data['time_from']
		time_to = info.validated_data['time_to']
		mobile = info.validated_data['mobile']
		address = info.validated_data['address']
		color = info.validated_data['color']
		branchid = info.validated_data['branchid']
		

		
		seluser = User.objects.get(email=email)

		if first_name != None:
			seluser.first_name=first_name

		if last_name != None:
			seluser.last_name = last_name

		if is_staff == True:
			seluser.is_staff = True
			seluser.is_admin = False
			seluser.is_manager = False


		if is_manager == True:
			seluser.is_staff = False
			seluser.is_admin = False
			seluser.is_manager = True


		if is_admin == True:
			seluser.is_staff=False
			seluser.is_manager=False
			seluser.is_admin=True


		if username != None:
			seluser.username = username

		if password != None:
			seluser.set_password(password)

		seluser.save()
		get_services_list = list(json.loads(info.validated_data['service']))
		print('your service list',get_services_list)
		if len(get_services_list) !=0:
			#get_services_list = list(json.loads(info.validated_data['services']))
			
			sel_service=track_service_providers.objects.filter(provider=seluser)

			for x in sel_service:
				x.delete()

			for x in get_services_list:
				print('get services list item ',x)
				ser=Service.objects.get(id=int(x))
				track_service_providers.objects.create(provider=seluser,service = ser)


		get_emp = Employe.objects.get(user_staff=seluser)

		if dob != None:
			get_emp.dob = dob


		if time_from != None:
			get_emp.time_from = time_from

		if time_to != None:
			get_emp.time_to = time_to

		if mobile != None:
			get_emp.mobile = mobile

		if address != None:
			get_emp.address = address

		if color != None:
			get_emp.color = color

		get_emp.save()

		get_workdays_list = list(json.loads(info.validated_data['workday']))
		print('workdays are ',get_workdays_list)
		if len(get_workdays_list) != 0:
			

			sel_workday_table=workdays.objects.filter(staff=seluser)

			for x in sel_workday_table:
				x.delete()

			for x in get_workdays_list:
				
				workdays.objects.create(staff=seluser,day=x)

		
		if branchid != None and branchid !=0:
			br=BranchEmployee.objects.filter(staff=seluser)

			for x in br:
				x.delete()

			sel_branch = Branch.objects.get(id=int(branchid))
			BranchEmployee.objects.create(staff=seluser,branch_name=sel_branch)
		
		

		return Response({'status':'updated'})

	return Response({'status':'failed'})
			







@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_user_info(request):
	serializer = user_data(data=request.data)

	if serializer.is_valid():
		info = {}
		selectUser = User.objects.get(id=int(serializer.validated_data['userid']))
		
		info['id'] = selectUser.id
		info['first_name'] = selectUser.first_name
		info['last_name'] = selectUser.last_name
		info['email'] = selectUser.email
		info['username'] = selectUser.username


		selectemp = Employe.objects.get(user_staff=selectUser)

		info['address'] = selectemp.address
		info['mobile'] = selectemp.mobile
		info['dob'] = selectemp.dob
		info['color'] = selectemp.color
		info['time_from'] = selectemp.time_from
		info['time_to'] = selectemp.time_to
		role = 'employee'
		if selectUser.is_admin == True:
			role = 'admin'

		if selectUser.is_manager == True :
			role='manager'

		if selectUser.is_staff == True:
			role='employee'

		info['role'] = role


		servicesselect = track_service_providers.objects.filter(provider=selectUser)

		info['services'] = []
		for x in servicesselect:
			info['services'].append(x.service.id)


		selworkday = workdays.objects.filter(staff=selectUser)

		info['workdays'] = []

		for x in selworkday:
			info['workdays'].append(x.day)


		
		sel_branch = BranchEmployee.objects.get(staff = selectUser)

		info['branchid'] = sel_branch.branch_name.id



		return Response(info)












@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_services(request):
	sr= Service.objects.all()
	info = []

	for x in sr:
		info.append({'id':x.id,'name':x.title})

	return Response(info)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_to_branch_employee(request):
	getdata = add_to_branch(data=request.data)

	if getdata.is_valid():
		userid = getdata.validated_data['userid']
		branchid = getdata.validated_data['branchid']

		sel_emp = User.objects.get(id=int(userid))
		sel_branch = Branch.objects.get(id=int(branchid))



		BranchEmployee.objects.create(branch_name=sel_branch,staff=sel_emp)

		return Response({"created":"ok"})





@api_view(['POST',])
@permission_classes([IsAuthenticated])
def staff_to_add(request):
	role = 'Emoloyee'
	info = {"employee":[],"branch":[]}
	find = User.objects.filter(Q(is_admin=True) | Q(is_staff=True) | Q(is_manager=True))
	for x in find:
		if x.is_superuser == True:
			continue
		if BranchEmployee.objects.filter(staff=x).exists() == False:
			if x.is_manager == True:
				role='Manager'

			if x.is_staff ==  True:
				role = "Employee"

			if x.is_admin == True:
				role = 'Admin'
			info["employee"].append({"id":x.id,"name":str(x.first_name +' '+ x.last_name),"role":str(role)})


	all_branch = Branch.objects.all()

	for x in all_branch:
		info["branch"].append({"name":x.name,"id":x.id})


	return Response(info)



@api_view(['POST',])
@permission_classes([IsAuthenticated])
def deleteemp(request):
	idno = request.GET['idnum']
	User.objects.get(id=int(idno)).delete()
	return Response({'deleted':'yes'})


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def staff_list(request):

	serializer = staff_lists(data=request.data)

	if serializer.is_valid():
		branch = serializer.validated_data['branch']

		if branch == 'all':
			info = {"branch":[],"employee":[]}
			all_employee = User.objects.filter(Q(is_admin=True) | Q(is_staff=True) | Q(is_manager=True))
			all_branch = Branch.objects.all()

			for branchname in all_branch:
				title = branchname.name
				info['branch'].append(title)


			for empdata in all_employee:
				if empdata.is_superuser == True:
					continue
				branchName='no branch'
				try:
					findStaff=BranchEmployee.objects.get(staff = empdata)
					branchName = findStaff.branch_name

				except:
					pass

				workrole=''
				if empdata.is_manager == True:
					workrole = 'Manager'

				elif empdata.is_staff == True:
					workrole = 'Employee'

				elif empdata.is_admin == True :
					workrole = 'Admin'

				info['employee'].append(

					{
					"id":int(empdata.id),
					"full_name":str(empdata.first_name) + str(empdata.last_name),
					 "email":str(empdata.email),
					 "username":str(empdata.username),
					 "role": str(workrole),
					 'branchname':str(branchName)
					}

					)



			return Response(info)



		else:
			info = {"branch":[],"employee":[]}
			all_employee = User.objects.filter(branchemployee__branch_name__name=branch)
			all_branch = Branch.objects.all()

			for branchnames in all_branch:
				title = branchnames.name
				info['branch'].append(title)


			for empdata in all_employee:
				branchName='no branch'
				try:
					findStaff=BranchEmployee.objects.get(staff = empdata)
					branchName = findStaff.branch_name

				except:
					pass

				workrole=''
				if empdata.is_manager == True:
					workrole = 'Manager'

				elif empdata.is_staff == True:
					workrole = 'Employee'

				elif empdata.is_admin == True :
					workrole = 'Admin'

				info['employee'].append(

					{
					"id":int(empdata.id),
					"full_name":str(empdata.first_name) + str(empdata.last_name),
					 "email":str(empdata.email),
					 "username":str(empdata.username),
					 "role": str(workrole),
					 'branchname':str(branchName)
					}

					)



			return Response(info)








