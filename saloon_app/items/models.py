from django.db import models


class product_items(models.Model):
	name = models.CharField(max_length=200)
	price = models.FloatField()


	def __str__(self):
		return str(self.name)
