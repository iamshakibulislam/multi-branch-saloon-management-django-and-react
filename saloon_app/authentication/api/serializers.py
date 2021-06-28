from rest_framework import serializers
from marketing.models import *
from companybranch.models import *

from staffall.models import *
from authentication.models import User
import json

class RegistrationSerializers(serializers.ModelSerializer):
      password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True,required=False)
      dob = serializers.CharField(max_length=120,required=False,allow_null=True)
      services = serializers.CharField(max_length=100,required=False,allow_null=True)
      workdays = serializers.CharField(max_length=22,required=False,allow_null=True)
      
      time_from = serializers.CharField(max_length=22,required=False,allow_null=True)
      time_to = serializers.CharField(max_length=22,required=False,allow_null=True)
      mobile = serializers.CharField(max_length=22,required=False,allow_null=True)
      address = serializers.CharField(max_length=44,required=False)
      color = serializers.CharField(max_length=33,required=False,allow_null=True)
      branch = serializers.IntegerField(required=False)

      class Meta:
            model = User
            fields = '__all__'
           # fileds = [ 'email','username', 'password', 'password2']
            extra_kwargs = {
                  'password': {'write_only': True}

            }
      
      def save(self):
            
            user = User(
                  first_name=self.validated_data['first_name'],
                  last_name=self.validated_data['last_name'],
                  is_staff = self.validated_data.get('is_staff',False),
                  is_manager=self.validated_data.get('is_manager',False),
                  is_admin=self.validated_data.get('is_admin',False),
                  email=self.validated_data['email'],
                  username = self.validated_data['username'],
            )
            password = self.validated_data['password']
            password2 = self.validated_data['password2']

            if password != password2:
                  raise serializers.ValidationError({'password': 'passwords must match!! '})
            user.set_password(password)
            user.save()

            #profile adding would be heere
            
            if user.is_manager == True or user.is_staff == True or user.is_admin == True:

                  if self.validated_data['is_manager'] == True or self.validated_data['is_staff'] == True or self.validated_data['is_admin']:
                        if self.validated_data['is_superuser'] == True:
                              pass
                        else:

                              getuser = User.objects.get(email=user.email)


                              sel_branch = Branch.objects.get(id=int(self.validated_data['branch']))
                              Employe.objects.create(

                                    user_staff = getuser,
                                    address = self.validated_data['address'],
                                    mobile = self.validated_data['mobile'],
                                    dob = self.validated_data['dob'],
                                    color =  self.validated_data['color'],
                                    
                                    time_from = self.validated_data['time_from'],
                                    time_to = self.validated_data['time_to'],
                                    




                                    )


                              BranchEmployee.objects.create(

                                    branch_name = sel_branch,
                                    staff = user


                                    )



                              get_services_list = list(json.loads(self.validated_data['services']))

                              if len(get_services_list) != 0:

                                    for ser in get_services_list:


                                          track_service_providers.objects.create(
                                                service = Service.objects.get(id=int(ser)),
                                                provider = user
                                                )



                              get_workdays= list(json.loads(self.validated_data['workdays']))

                              if len(get_workdays) != 0:

                                    for x in get_workdays:
                                          workdays.objects.create(

                                                staff = user,
                                                day = x

                                                )


            return user


