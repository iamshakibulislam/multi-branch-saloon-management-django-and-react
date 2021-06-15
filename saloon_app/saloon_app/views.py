from django.shortcuts import render
from django.http import HttpResponse
def testing(request):
	return HttpResponse('<h1>wow</h1>')