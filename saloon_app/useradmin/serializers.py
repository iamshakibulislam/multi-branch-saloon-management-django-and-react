from django.db.models import fields
from rest_framework import serializers
from staffall.models import Employe
from authentication.models import User
from django.http import request


class UserSerlializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
class EmployeSerializer(serializers.ModelSerializer):
      user_staff = UserSerlializer()

      class Meta:
            model = Employe
            #fields = '__all__'
            fields = ['user_staff', 'mobile_no', ]



      def create(self,validated_data):
            user_data = validated_data.pop('user_staff')
            user_instance = User.objects.create(**user_data)
            
            profile=Employe.objects.create(user_staff=user_instance, **validated_data)
            profile.save()
            return profile