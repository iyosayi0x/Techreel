from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(max_length=200)
    date_created = serializers.DateTimeField(format='%b %d %Y')

    class Meta:
        model = BlogPost
        fields = ('author', 'id', 'title', 'slug', 'tags', 'thumbnail',
                  'exert', 'content', 'date_created',)

class BlogPostSerializer_List(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'tags', 'thumbnail', 'exert',)

class SiteMapBlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'slug', 'title',)
