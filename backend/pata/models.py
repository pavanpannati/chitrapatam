
from django.db import models
from django.db.models import *
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Permission
from datetime import datetime,date
from django.contrib.auth.hashers import make_password,check_password

class Cast(models.Model):
    actor_name = models.CharField(max_length=100)
    character_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='cast_images/')
    
    def __str__(self):
        return f"{self.actor_name} as {self.character_name}"

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class RegisterManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

class register(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=13)
    username = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = RegisterManager()

    class Meta:
        db_table = 'Register'

        
class login(models.Model):
    email=EmailField(max_length=50)
    password=CharField('Password',max_length=30)

    class Meta:
        db_table = "Login"

class movie_posters(models.Model):
    title = models.CharField(max_length=200)
    release_date = models.CharField(max_length=20, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    genres = models.JSONField(blank=True, null=True)  # Stores list like ["Action", "Drama"]
    
    poster_url = models.URLField(max_length=500, blank=True, null=True)

    director = models.JSONField(blank=True, null=True)  # Can store a list of names
    writer = models.JSONField(blank=True, null=True)
    cast = models.ManyToManyField(Cast,related_name='movies')  # Store top billed cast
    streaming_on = models.CharField(max_length=100, blank=True, null=True)  # e.g., 'Netflix'

    def __str__(self):
        return self.title

    
    class Meta:
        db_table = "MoviePosters"
    