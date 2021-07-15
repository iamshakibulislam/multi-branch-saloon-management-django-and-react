#from staffall.models import Employe
from django.db import models
from django.db.models.fields import TimeField
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.

class Supplier(models.Model):

    name = models.CharField(max_length=150,null=True,blank=True)
    phone_number = models.CharField(max_length=150,null=True,blank=True)
    address = models.CharField(max_length=100,null=True,blank=True)
    supplier_contact_person= models.CharField(max_length=100,null=True,blank=True)

    def __str__(self):
        return self.name

class ItemCategorey(models.Model):
      title = models.CharField(max_length=151,null=True,blank=True)
      def __str__(self):
          return self.title

class Item(models.Model):
      title = models.CharField(max_length=220,null=True,blank=True)
      categorey = models.ForeignKey(ItemCategorey,on_delete=models.CASCADE)
      #supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE,related_name="categorey")
      item_code = models.CharField(max_length=100,null=True,blank=True)
      brandname = models.CharField(max_length=100,null=True,blank=True)
      unitname = models.CharField(max_length=100,null=True,blank=True)
      price = models.IntegerField(null=True,blank=True)
      location = models.TextField(max_length=300,null=True,blank=True)
      itemcommision = models.IntegerField(null=True,blank=True)
      monthlyTarget = models.IntegerField(null=True,blank=True)
      status = models.BooleanField(default=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)

      def __str__(self):
          return self.title


class ServiceCategorey(models.Model):
      title = models.CharField(max_length=140,null=True,blank=True)
      def __str__(self):
          return self.title

class Service(models.Model):
      title = models.CharField(max_length=150,null=True,blank=True)
      
      servicelocation = models.CharField(max_length=300,null=True,blank=True)
      cost = models.IntegerField(null=True,blank=True)
      taxes = models.IntegerField(null=True,blank=True)
      serviceduration= models.IntegerField(null=True,blank=True)
      #provider = models.ForeignKey(to='staffall.Employe',on_delete=models.CASCADE)
      servicecommision = models.IntegerField(null=True,blank=True)
      monthlytarget = models.IntegerField(null=True,blank=True)
      category = models.ForeignKey(ServiceCategorey,on_delete=models.CASCADE,null=True)
      def __str__(self):
          return self.title




class vouchers(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    value = models.IntegerField()


    def __str__(self):
        return str(self.name)




class buy_voucher(models.Model):
    date = models.DateField(auto_now_add=True,auto_now=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    voucher = models.ForeignKey(vouchers,on_delete=models.CASCADE)

