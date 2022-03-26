from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('author','id', 'title', 'slug' , 'tags', 'thumbnail','exert','content', 'featured' , 'date_created',)