from rest_framework import serializers
from authentication.models import User
from staffall.models import Employe

class RegistrationSerializers(serializers.ModelSerializer):
      password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

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
                  is_staff = self.validated_data['is_staff'],
                  is_manager=self.validated_data['is_manager'],
                  is_admin=self.validated_data['is_admin'],
                  email=self.validated_data['email'],
                  username = self.validated_data['username'],
            )
            password = self.validated_data['password']
            password2 = self.validated_data['password2']

            if password != password2:
                  raise serializers.ValidationError({'password': 'passwords must match!! '})
            user.set_password(password)
            user.save()

            

            return user


