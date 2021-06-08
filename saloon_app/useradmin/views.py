from django.shortcuts import render

# Create your views here.
#from authentication.api import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from staffall.models import Employe


@api_view(['GET'])
def apiOverView(request):
      api_urls = {
            'add_staff': '/add-staff/',
      }
      return Response(api_urls)
