from django.test import TestCase
from blog.models import BlogPost
from authors.models import Author


class TestModel(TestCase):
    def setUp(self):
        self.author = Author.objects.create(name='test author')
        self.post1 = BlogPost.objects.create(
            author=self.author,
            title='test title',
            tags=['tech'],
            exert='test exert'
        )

    def test_slug_assigned_on_creation(self):
        self.assertEqual(self.post1.slug, 'test-title')

    def test_auto_featured_assign(self):
        BlogPost.objects.create(
            author=self.author,
            title='test title1',
            tags=['tech'],
            exert='test exert',
            featured=True
        )
        BlogPost.objects.create(
            author=self.author,
            title='test title2',
            tags=['tech'],
            exert='test exert',
            featured=True
        )
        BlogPost.objects.create(
            author=self.author,
            title='test title3',
            tags=['tech'],
            exert='test exert',
            featured=True
        )
        BlogPost.objects.create(
            author=self.author,
            title='test title4',
            tags=['tech'],
            exert='test exert',
            featured=True
        )
        self.assertEqual(BlogPost.objects.get(pk=2).featured, False)
        self.assertEqual(BlogPost.objects.get(pk=3).featured, True)
        self.assertEqual(BlogPost.objects.get(pk=4).featured, True)
        self.assertEqual(BlogPost.objects.get(pk=5).featured, True)
