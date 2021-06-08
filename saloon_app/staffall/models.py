# from marketing.models import *
# from companybranch.models import *
from django.db import models
from django.db.models.fields import TimeField


from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.

class Employe(models.Model):
      user = models.OneToOneField(User, on_delete=models.CASCADE)
      address = models.TextField(max_length=300,null=True,blank=True)
      photo = models.ImageField(upload_to='agent_photos/%Y/%m/%d',  default="../static/profile.jpg")
      mobile_no = models.CharField(max_length=200,null=True,blank=True)
      dob = models.CharField(max_length=200,null=True,blank=True)
      status = models.BooleanField(default=True)
      branch =  models.ForeignKey(to='companybranch.Branch', on_delete=models.CASCADE)
      services = models.ManyToManyField(to='marketing.Service')
      item = models.ForeignKey(to='marketing.Item',on_delete=models.CASCADE)
      employment_date = models.DateTimeField(null=True,blank=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)


      def __str__(self):
          return self.user.username











