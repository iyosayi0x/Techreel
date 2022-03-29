from django.contrib import admin

# Register your models here.
from .models import News_Letter_User


class NewsLetterAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_joined',)


admin.site.register(News_Letter_User, NewsLetterAdmin)
