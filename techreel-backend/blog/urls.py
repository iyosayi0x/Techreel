from django.urls import path
from .views import BlogPostDetailView, BlogPostListView, BlogPostFeaturedView, BlogPostSearchView, BlogPostListPopularView, BlogPostTagFilterView, BlogPostListSitemapView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blogpost_list'),
    path('featured/', BlogPostFeaturedView.as_view(), name='blogpost_featured'),
    path('search/', BlogPostSearchView.as_view(),  name='blogpost_search'),
    path('popular/', BlogPostListPopularView.as_view(), name='blogpost_popular'),
    path('tag/', BlogPostTagFilterView.as_view(), name='blogpost_filter'),
    path('sitemap/blogposts/', BlogPostListSitemapView.as_view(),
         name='blogpost_sitemap_list'),
    path('<str:slug>/', BlogPostDetailView.as_view(), name='blogpost_detail'),
]
