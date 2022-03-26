from rest_framework.pagination import PageNumberPagination

class BlogPostPagination(PageNumberPagination):
    page_size=20
    max_page_size=25
    page_size_query_param = 'count'
    page_query_param='p'