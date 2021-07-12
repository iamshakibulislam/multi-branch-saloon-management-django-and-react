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
	sale_price = models.FloatField(null=True)
	commision = models.FloatField(null=True)
	target = models.FloatField(null=True)
	taxes = models.IntegerField(null=True)
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
	date = models.DateField(auto_now_add=True,auto_now=False)
	item = models.ForeignKey(product_items,on_delete=models.CASCADE)
	provider = models.ForeignKey(providers,on_delete=models.CASCADE,null=True)
	branch = models.ForeignKey(Branch,on_delete=models.SET_NULL,null=True)
	quantity = models.IntegerField(null=True,blank=True)


	def __str__(self):
		return str(self.item.name)


class order(models.Model):
	customer = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='customer')
	status_choise = [('pending','pending'),('arrived','arrived'),('canceled','canceled'),('completed','completed'),('working','working')]
	payment_status_choise = [('paid','paid'),('partial','partial'),('due','due')]
	date= models.DateField(auto_now_add=True)
	branch = models.ForeignKey(Branch,on_delete=models.SET_NULL,null=True)
	staff = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
	appointment_date = models.DateField(null=True,blank=True,auto_now_add=False,auto_now=False)
	appointment_time = models.TimeField(null=True,blank=True)
	status = models.CharField(choices=status_choise,max_length=200,default='pending')
	payment_status = models.CharField(choices=payment_status_choise,max_length=200,blank=True,null=True,default='paid')
	payment_method_choise = [('voucher','voucher'),('cash','cash')]
	payment_method = models.CharField(choices=payment_method_choise,max_length=200,blank=True,null=True)

	def __str__(self):
		return str(self.date)+' '+str(self.customer.first_name)+' '+str(self.staff.first_name)




class order_services(models.Model):
	order_ref = models.ForeignKey(order,on_delete=models.SET_NULL,null=True)
	servic_ref=models.ForeignKey(Service,on_delete=models.SET_NULL,null=True)


	

class order_items(models.Model):
	order_ref = models.ForeignKey(order,on_delete=models.SET_NULL,null=True)
	item_ref = models.ForeignKey(product_items,on_delete=models.SET_NULL,null=True)





class stock_transfer(models.Model):
	status_choise = [('sent','sent'),('pending','pending'),('recieved','recieved'),('confirmed','confirmed')]
	date = models.DateField(auto_now_add=True,auto_now=False)
	frombranch = models.ForeignKey(Branch,on_delete=models.CASCADE,related_name='from_branch')
	tobranch = models.ForeignKey(Branch,on_delete=models.CASCADE,related_name='to_branch')
	quantity = models.IntegerField(default=0)
	item = models.ForeignKey(product_items,on_delete=models.CASCADE)
	status = models.CharField(choices = status_choise,max_length=200,default='pending')


	def __str__(self):
		return str(self.date)