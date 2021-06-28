from django.db import models
from companybranch.models import *

from marketing.models import *


class item_category(models.Model):
	name = models.CharField(max_length=200,null=True,blank=True)


	def __str__(self):
		return str(self.name)

	class Meta:
		verbose_name = 'item category'
		verbose_name_plural = 'item categories'


class product_items(models.Model):
	name = models.CharField(max_length=200)
	price = models.FloatField()
	category = models.ForeignKey(item_category,on_delete=models.CASCADE,null=True,blank=True)


	def __str__(self):
		return str(self.name)



class providers(models.Model):
	name = models.CharField(max_length=200,null=True,blank=True)
	company = models.CharField(max_length=200,null=True,blank=True)
	contact = models.CharField(max_length=300,null=True,blank=True)



	def __str__(self):
		return str(self.name)



class buy_items(models.Model):
	date = models.DateField(auto_now_add=True)
	item = models.ForeignKey(product_items,on_delete=models.CASCADE)
	provider = models.ForeignKey(providers,on_delete=models.CASCADE)
	branch = models.ForeignKey(Branch,on_delete=models.SET_NULL,null=True)
	quantity = models.IntegerField(null=True,blank=True)


	def __str__(self):
		return str(self.item.name)


class order(models.Model):
	customer = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='customer')
	status_choise = [('pending','pending'),('approved','approved'),('canceled','canceled')]
	date= models.DateField(auto_now_add=True)
	branch = models.ForeignKey(Branch,on_delete=models.SET_NULL,null=True)
	staff = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
	appointment_date = models.DateField(null=False,blank=False,auto_now_add=False,auto_now=False)
	appointment_time = models.TimeField(null=False,blank=False)
	status = models.CharField(choices=status_choise,max_length=200,default='pending')


	def __str__(self):
		return str(self.date)




class order_services(models.Model):
	order_ref = models.ForeignKey(order,on_delete=models.SET_NULL,null=True)
	servic_ref=models.ForeignKey(Service,on_delete=models.SET_NULL,null=True)


	
