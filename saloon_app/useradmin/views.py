from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from .serializers import EmployeSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from staffall.models import Employe
from rest_framework.authtoken.models import Token

@api_view(['GET'])
def apiOverView(request):
      api_urls = {
            'add_staff': '/add-staff/',
      }
      return Response(api_urls)

@api_view(['POST',])
def addstaff(request):
      if request.method == 'POST':
            serializer = EmployeSerializer(data=request.data,context={'request': request})
            data = {}
            if serializer.is_valid():
                  user = serializer.save()
                  data['response'] = "successfully registered a new staff "
                  data['email'] = user.email
                  data['user_staff'] = user.user_staff
                  token = Token.objects.get(user=user).key 
                  data['token'] = token 

            else:
                  data = serializer.errors
            return Response(data)