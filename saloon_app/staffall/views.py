from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import staff_list as staffs
from companybranch.models import Branch,BranchEmployee
from authentication.models import User
from django.db.models import Q


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def deleteemp(request):
	idno = request.GET['idnum']
	User.objects.get(id=int(idno)).delete()
	return Response({'deleted':'yes'})


@api_view(['POST',])
@permission_classes([IsAuthenticated])
def staff_list(request):

	serializer = staffs(data=request.data)

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








