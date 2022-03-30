from django.test import SimpleTestCase
from newsletter.views import NewsLetterSignUpView
from django.urls import reverse, resolve


class TestUrls(SimpleTestCase):
    def test_signup_resolves(self):
        url = reverse('newsletter_signup')
        self.assertEquals(resolve(url).func.view_class, NewsLetterSignUpView)
