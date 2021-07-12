from authentication.api import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from authentication.api.serializers import RegistrationSerializers,get_user_email
from authentication.models import User
from django.db.models import Q

from rest_framework.authtoken.models import Token

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def user_info_by_email(request):
      info = get_user_email(data=request.data)

      if info.is_valid():
            email = info.validated_data['email']
            
            try:
                  check=User.objects.get(Q(email=email) | Q(phone=email))
                  return Response({'status':'found','email':check.email})

            except User.DoesNotExist:
                  return Response({'status':'not found'})




@api_view(['POST',])
@permission_classes([IsAuthenticated,])
def user_info(request):
      get_user = User.objects.get(email=request.user.email)
      role = ''
      first_name = get_user.first_name
      last_name = get_user.last_name
      email = get_user.email

      if get_user.is_superuser == True:
            role = 'superuser'
      elif get_user.is_staff == True:
            role = 'staff'

      elif get_user.is_admin == True:
            role = 'admin'

      elif get_user.is_manager == True:
            role = 'manager'

      else :
            role = 'user'

      return Response({'first_name':first_name,'last_name':last_name,'email':email,'role':role})

@api_view(['POST',])
def registration_view(request):
      if request.method == 'POST':
            serializer = RegistrationSerializers(data=request.data)
            data = {}
            if serializer.is_valid():
                  
                  user = serializer.save()
                  data['response'] = "successfully registered a new user. "
                  data['email'] = user.email
                  data['username'] = user.username


                  token = Token.objects.get(user=user).key 
                  data['token'] = token 

            else:
                  data = serializer.errors
            return Response(data)


