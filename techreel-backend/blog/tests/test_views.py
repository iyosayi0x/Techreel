from django.test import TestCase, Client
from django.urls import reverse
from blog.models import BlogPost
from authors.models import Author
import json


class TestView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_featured_view_GET(self):
        response = self.client.get(reverse('blogpost_featured'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_list_view_GET(self):
        response = self.client.get(reverse('blogpost_list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_popular_view_GET(self):
        response = self.client.get(reverse('blogpost_popular'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_detail_view_GET(self):
        author = Author.objects.create(name='test author')
        BlogPost.objects.create(
            author=author,
            title='test title',
            tags=['tech'],
            exert='test exert'
        )

        response = self.client.get(
            reverse('blogpost_detail', args=['test-title']))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_detail_view_GET_noData(self):
        response = self.client.get(
            reverse('blogpost_detail', args=['invalid-param']))
        self.assertEqual(response.status_code, 404)

    def test_tag_view_POST(self):
        url = reverse('blogpost_filter')
        response = self.client.post(url, {
            "tag": 'tech'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_tag_view_POST_noData(self):
        url = reverse('blogpost_filter')
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)

    def test_search_view_POST(self):
        url = reverse('blogpost_search')
        response = self.client.post(url, {
            'search_term': 'test'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

    def test_search_view_POST_noData(self):
        url = reverse('blogpost_search')
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
