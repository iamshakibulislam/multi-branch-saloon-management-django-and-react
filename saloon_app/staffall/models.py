# from marketing.models import *
# from companybranch.models import *
from django.db import models
from django.db.models.fields import TimeField
from companybranch.models import Branch
from django.conf import settings
from marketing.models import *
User = settings.AUTH_USER_MODEL
# Create your models here.

class services(models.Model):

  name = models.CharField(null=True,max_length=200)


  def __str__(self):
    return self.name



class track_service_providers(models.Model):

  service = models.ForeignKey(Service,on_delete=models.CASCADE)
  provider = models.ForeignKey(User,on_delete=models.CASCADE)


  def __str__(self):
    return str(self.provider)


class Employe(models.Model):
      colorchoise = [
      ('red','Red'),
      ('blue','Blue'),
      ('green','Green'),
      ('yellow','Yellow'),
      ('orange','Orange'),
      ('pink','Pink'),
      ('purple','Purple'),
      ('skyblue','Skyblue')
      ]

      daychoise = [
      ('Sat','Saturday'),
      ('Sun','Sunday'),
      ('Mon','Monday'),
      ('Tue','Tuesday'),
      ('Wed','Wednesday'),
      ('Thu','Thursday'),
      ('Fri','Friday')
      ]
      user_staff = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
      address = models.TextField(max_length=200,null=True,blank=True)
      photo = models.ImageField(upload_to='agent_photos/%Y/%m/%d',null=True,blank=True,  default="../static/profile.jpg")
      mobile = models.CharField(max_length=200,null=True,blank=True)
      dob = models.DateField(max_length=200,null=True,blank=True)
      color = models.CharField(choices=colorchoise,max_length=200,null=True)
      workdays_from = models.CharField(choices=daychoise,max_length=200,null=True)
      workdays_to = models.CharField(choices=daychoise,max_length=200,null=True)

      time_from = models.TimeField(null=True)
      time_to = models.TimeField(null=True)



      status = models.BooleanField(default=True)
      branch =  models.ForeignKey(Branch,null=True,blank=True, on_delete=models.CASCADE)
      
      
      employment_date = models.DateTimeField(null=True,blank=True,auto_now_add=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)


      def __str__(self):
          return str(self.user_staff.first_name)











