from django.db import models
from django.contrib.auth.models import AbstractBaseUser ,  PermissionsMixin
from .manager import AccountManager

# Create your models here.
class Account(AbstractBaseUser , PermissionsMixin):
    username = models.CharField(max_length=20)
    email = models.EmailField(unique=True , max_length=255)
    staff = models.BooleanField(default=False)
    superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ('username',)

    objects = AccountManager()

    @property
    def is_superuser(self):
        return self.superuser

    @property
    def is_staff(self):
        return self.staff

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.email

