from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *


@api_view(['POST',])
def show_company_info(request):

	get_info = company_setup.objects.all()[0]

	return Response({'name':get_info.name,'email':get_info.email,'cr_number':get_info.cr_number,'tax_number':get_info.tax_number,'logo':get_info.logo.url,'phone':get_info.phone,'address':get_info.address})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def set_company_info(request):
	info = set_info(data=request.data)

	if info.is_valid():

		name = info.validated_data['name']
		email = info.validated_data['email']
		address = info.validated_data['address']
		phone = info.validated_data['phone']
		cr_number = info.validated_data['cr_number']
		tax_number = info.validated_data['tax_number']

		logo = info.validated_data['logo']



		get_obj = company_setup.objects.all()

		if len(get_obj) == 0:
			company_setup.objects.create(name=name,address=address,email=email,phone=phone,cr_number=cr_number,tax_number=tax_number,logo=logo)


		if len(get_obj) > 0:

			sel = get_obj[0]


			if sel.name != name and name !=  None and name != '':
				sel.name = name

			if sel.address != address and address != None and address != '':
				sel.address = address


			if sel.email != email and email != None and email != '':
				sel.email = email


			if sel.phone != phone and phone != None and phone != '':
				sel.phone = phone


			if sel.cr_number != cr_number and cr_number != None and cr_number != '':
				sel.cr_number = cr_number


			if sel.tax_number != tax_number and tax_number != None and tax_number != '':
				sel.tax_number = tax_number


			if sel.logo != None and logo != '' and logo != None:
				sel.logo = logo




			sel.save()




		return Response({'status':'ok'})


@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_branch(request):
	info = update_branches(data=request.data)

	if info.is_valid():
		getid = info.validated_data['identify']
		name = info.validated_data['name']
		address =  info.validated_data['address']
		branch_email = info.validated_data['branch_email']
		branch_phone = info.validated_data['branch_phone']

		sel=Branch.objects.get(id=int(getid))

		if sel.name != name:
			sel.name = name

		if sel.address != address:
			sel.address = address

		if sel.email != branch_email:
			sel.email = branch_email

		if sel.phone != branch_phone:
			sel.phone = branch_phone


		sel.save()

		return Response({'status':'updated'})

	else:
		return Response({'status':'failed'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def get_branch(request):
	info = get_branch_id(data=request.data)

	if info.is_valid():

		result = {}

		getid = info.validated_data['getid']

		sel = Branch.objects.get(id=int(getid))

		result['id'] = sel.id
		result['name'] = sel.name
		result['address'] = sel.address
		result['phone'] = sel.phone
		result['email'] = sel.email

		return Response(result)

	else:
		return Response({'status':'failed'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def showBranch(request):
	branchJson=[]
	branchlist=Branch.objects.all()
	for branch in branchlist:
		branchJson.append({'id':branch.id, 'name':branch.name,'address':branch.address})

	return Response(branchJson)



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def add_branch(request):
	info = get_branch_add_data(data=request.data)
	if info.is_valid():
		name=info.validated_data['name']
		address=info.validated_data['address']
		branch_phone = info.validated_data['branch_phone']
		branch_email = info.validated_data['branch_email']
		Branch.objects.create(name=name,address=address,email=branch_email,phone=branch_phone)
		return Response({'status':'created'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_branch(request):
	getdata = get_delete_id(data=request.data)

	if getdata.is_valid():
		getid = int(getdata.validated_data['identify'])
		Branch.objects.get(id=getid).delete()
		return Response({'status':'deleted'})


	