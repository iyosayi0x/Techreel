from django.contrib import admin
from django.urls import path , include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/newsletter/', include('newsletter.urls')),
    path('api/blog/' , include('blog.urls')),
    path('summernote/', include('django_summernote.urls')),
]
