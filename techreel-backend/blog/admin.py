from django.contrib import admin
from .models import BlogPost
from django_summernote.admin import SummernoteModelAdmin

class BlogPostAdmin(SummernoteModelAdmin):
    list_display = ('author' , 'title' , 'featured','date_created',)
    exclude = ('slug',)
    search_fields = ('title',)
    summernote_fields = ('content',)


admin.site.register(BlogPost , BlogPostAdmin)