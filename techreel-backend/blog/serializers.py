from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(max_length=200)
    date_created = serializers.DateTimeField(format='%b %d %Y')

    class Meta:
        model = BlogPost
        fields = ('author', 'id', 'title', 'slug', 'tags', 'thumbnail',
                  'exert', 'content', 'featured', 'date_created',)
