# from marketing.models import *
# from companybranch.models import *
from django.db import models
from django.db.models.fields import TimeField


from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.

class Employe(models.Model):
      user_staff = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
      address = models.TextField(max_length=200,null=True,blank=True)
      photo = models.ImageField(upload_to='agent_photos/%Y/%m/%d',null=True,blank=True,  default="../static/profile.jpg")
      mobile_no = models.CharField(max_length=200,null=True,blank=True)
      dob = models.CharField(max_length=200,null=True,blank=True)
      status = models.BooleanField(default=True)
      branch =  models.ForeignKey(to='companybranch.Branch',null=True,blank=True, on_delete=models.CASCADE)
      services = models.ManyToManyField(to='marketing.Service',null=True,blank=True)
      item = models.ForeignKey(to='marketing.Item',on_delete=models.CASCADE,null=True,blank=True)
      employment_date = models.DateTimeField(null=True,blank=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)


      def __str__(self):
          return str(self.user_staff.username)











