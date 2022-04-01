from django.contrib import admin
from django.urls import path, include
from .sitemaps import BlogPostSitemap
from django.contrib.sitemaps.views import sitemap

sitemaps = {
    'blogpost': BlogPostSitemap
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    path('api/newsletter/', include('newsletter.urls')),
    path('api/blog/', include('blog.urls')),
    path('summernote/', include('django_summernote.urls')),
]
