from django.db import models
from django.utils import timezone
from django.conf import settings
from staffall.models import Employe
from django.conf import settings
from django.db.models.signals import post_save 
from django.dispatch import receiver 
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionManager, PermissionsMixin)


class UserManager(BaseUserManager):
      def create_user(self, email, password=None, **extra_fields):

            if email is None:
                  raise TypeError('users should have a email')
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user

      def create_superuser(self, email, password, **extra_fields):
            extra_fields.setdefault('is_staff', True)
            extra_fields.setdefault('is_superuser', True)
            extra_fields.setdefault('is_active', True)
            extra_fields.setdefault('is_manager',True)
            extra_fields.setdefault('is_admin',True)
            if extra_fields.get('is_staff') is not True:
                  raise TypeError('superuser must be staff')
            return self.create_user(email, password, **extra_fields)

            # if password is None:
            #       raise TypeError('Password should not be None')
            # user = self.create_user(username, email, password)
            # user = self.model(username=username, email=self.normalize_email(email))
            # user.is_superuser = True
            # user.is_staff = True 
            # user.is_active = True
            # user.save(using=self._db)
            # return user 

class User(AbstractBaseUser, PermissionsMixin):

      first_name = models.CharField(max_length=40)
      last_name = models.CharField(max_length=40)
      username = models.CharField(max_length=40,unique=True)

      email = models.EmailField(max_length=255, unique=True, db_index=True)
      is_manager=models.BooleanField(default=False)
      is_admin=models.BooleanField(default=False)
      #is_admin=models.BooleanField(default=False)
      is_active=models.BooleanField(default=True)
      is_staff=models.BooleanField(default=False)
      balance = models.FloatField(default=0,null=True)
      phone = models.CharField(max_length=22,null=True)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at=models.DateTimeField(auto_now=True)

      objects = UserManager()

      USERNAME_FIELD = 'email'


      


      REQUIRED_FIELDS = ['username']

      


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance, created=False, **kwargs):
      if created:
            Token.objects.create(user=instance)

      
'''       
      if instance.is_staff == True or instance.is_manager == True or instance.is_admin == True:
            
            Employe.objects.get_or_create(user_staff=instance)


'''

