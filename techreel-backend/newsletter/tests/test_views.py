from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()

    def test_newsletter_sign_up_view(self):
        url = reverse('newsletter_signup')
        request = self.client.post(url, {
            'email': 'testemail@test.test'
        })
        self.assertEqual(request.status_code, 200)
        self.assertEqual(request['content-type'], 'application/json')

    def test_newsletter_sign_up_view_noData(self):
        url = reverse('newsletter_signup')
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
