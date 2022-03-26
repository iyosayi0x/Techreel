from csv import list_dialects
from django.contrib import admin
from .models import Author

# Register your models here.
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_added',)


admin.site.register(Author , AuthorAdmin)



