from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from blog.models import BlogPost


class Site:
    domain = 'techeel.co'
    name = 'techreel.co'

    def __str__(self):
        return self.domain


class BlogPostSitemap(Sitemap):
    changefreq = 'weekly'

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(BlogPostSitemap, self).get_urls(site=site, **kwargs)

    def items(self):
        return BlogPost.objects.all().order_by('date_created')
