from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
# Create your models here.

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=200, unique=True)
    isDone = models.BooleanField(default=False)
    isDoing = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
