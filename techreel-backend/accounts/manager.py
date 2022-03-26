from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self , username , email , password=None):
        if not email:
            raise ValueError("Email field is required")

        if not username:
            raise ValueError("Username is required")

        user = self.model(username=username , email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staff_user(self , username , email , password=None):
        user = self.create_user(username , email , password)
        user.staff= True
        user.save(using=self._db)
        return user

    def create_superuser(self, username , email , password=None):
        user = self.create_user(username , email , password)
        user.superuser = True
        user.staff = True
        user.save(using=self._db)
        return user