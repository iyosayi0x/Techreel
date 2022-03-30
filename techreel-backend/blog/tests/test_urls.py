from django.test import SimpleTestCase
from django.urls import reverse, resolve
from blog.views import (BlogPostListView,
                        BlogPostFeaturedView,
                        BlogPostSearchView,
                        BlogPostTagFilterView,
                        BlogPostListPopularView,
                        BlogPostDetailView
                        )


class TestUrls(SimpleTestCase):
    def test_blog_post_list_resolves(self):
        url = reverse('blogpost_list')
        self.assertEqual(resolve(url).func.view_class, BlogPostListView)

    def test_blog_post_featured_resolves(self):
        url = reverse('blogpost_featured')
        self.assertEqual(resolve(url).func.view_class, BlogPostFeaturedView)

    def test_blog_post_search_resolves(self):
        url = reverse('blogpost_search')
        self.assertEqual(resolve(url).func.view_class, BlogPostSearchView)

    def test_blog_post_featured_resolves(self):
        url = reverse('blogpost_filter')
        self.assertEqual(resolve(url).func.view_class, BlogPostTagFilterView)

    def test_blog_post_popular_resolves(self):
        url = reverse('blogpost_popular')
        self.assertEqual(resolve(url).func.view_class,
                         BlogPostListPopularView)

    def test_blog_post_detail_resolves(self):
        url = reverse('blogpost_detail', args=['slug-param'])
        self.assertEqual(resolve(url).func.view_class, BlogPostDetailView)
