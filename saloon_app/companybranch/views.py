from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Branch
from .serializers import get_branch_add_data,get_delete_id

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


	