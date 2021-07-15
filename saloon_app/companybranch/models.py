from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL



class company_setup(models.Model):

  name = models.CharField(max_length=400,null=True,blank=True)
  email = models.EmailField(max_length=200,null=True,blank=True)
  address = models.TextField(null=True,blank=True)

  phone = models.CharField(max_length=20,null=True,blank=True)
  cr_number = models.CharField(max_length=50,null=True,blank=True)

  tax_number = models.CharField(max_length=50,null=True,blank=True)
  logo = models.ImageField(null=True,upload_to='media/')


  def __str__(self):
    return str(self.name)



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

      name = models.CharField(max_length=330,null=True,blank=True)
      
      address = models.TextField(max_length=320,null=True,blank=True)
      phone = models.CharField(max_length=250,null=True)
      email = models.CharField(max_length=250,null=True)
      created_date = models.DateTimeField(auto_now_add=True)
      updated_date = models.DateTimeField(auto_now=True)

      def __str__(self):
          return self.name





class BranchEmployee(models.Model):

  branch_name = models.ForeignKey(Branch,on_delete=models.CASCADE,null=True)
  staff = models.ForeignKey(User,on_delete=models.CASCADE,null=True)


  def __str__(self):
    return str(self.staff.first_name)
