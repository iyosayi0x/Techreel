from django.db import models

# Create your models here.


class News_Letter_User(models.Model):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'News Letter Users'
        verbose_name = "News Letter User"

    def __str__(self):
        return self.email
