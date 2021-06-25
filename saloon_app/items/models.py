from django.db import models



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



