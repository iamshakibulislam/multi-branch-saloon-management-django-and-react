from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.
class Manager(models.Model):

      user = models.OneToOneField(User, on_delete=models.CASCADE)
      address = models.TextField(max_length=330,null=True,blank=True)
      photo = models.ImageField(upload_to='agent_photos/%Y/%m/%d',  default="../static/profile.jpg")
      mobile_no = models.CharField(max_length=200,null=True,blank=True)
      status = models.BooleanField(default=True)
      employment_date = models.DateTimeField(null=True,blank=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)

      def __str__(self):
          return self.user.username



class Branch(models.Model):
      title = models.CharField(max_length=330,null=True,blank=True)
      manager =  models.ForeignKey(Manager, on_delete=models.CASCADE)
      address = models.TextField(max_length=320,null=True,blank=True)
      mobile_no = models.CharField(max_length=230,null=True,blank=True)
      status = models.BooleanField(default=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)

      def __str__(self):
          return self.title