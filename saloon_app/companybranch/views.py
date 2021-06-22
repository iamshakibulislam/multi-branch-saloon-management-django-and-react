from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Branch
from .serializers import get_branch_add_data,get_delete_id,get_branch_id,update_branches



@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def update_branch(request):
	info = update_branches(data=request.data)

	if info.is_valid():
		getid = info.validated_data['identify']
		name = info.validated_data['name']
		address =  info.validated_data['address']

		sel=Branch.objects.get(id=int(getid))

		if sel.name != name:
			sel.name = name

		if sel.address != address:
			sel.address = address

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
		Branch.objects.create(name=name,address=address)
		return Response({'status':'created'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def delete_branch(request):
	getdata = get_delete_id(data=request.data)

	if getdata.is_valid():
		getid = int(getdata.validated_data['identify'])
		Branch.objects.get(id=getid).delete()
		return Response({'status':'deleted'})


	