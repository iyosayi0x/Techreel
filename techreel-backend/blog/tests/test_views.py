from django.test import TestCase, Client
from django.urls import reverse
from blog.models import BlogPost
import json


class TestView(TestCase):
    def setup(self):
        self.client = Client()
        self.post = BlogPost.objects.get(pk=1)

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
