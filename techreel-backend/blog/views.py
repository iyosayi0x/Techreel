from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .models import BlogPost
from .serializers import BlogPostSerializer
from django.db.models import Q
from django.utils import timezone
from .utils import BlogPostPagination

# works
class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer

# works
class BlogPostListView(ListAPIView):
    pagination_class = BlogPostPagination
    queryset = BlogPost.objects.all().filter(featured=False).order_by('-date_created')
    serializer_class = BlogPostSerializer

# works
class BlogPostSearchView(APIView):
    def post(self, request):
        data = request.data
        search_term = data.get('search_term')
        search_term_list = search_term.split()
        lookup = Q()
        # loop over search terms
        for search_item in search_term_list:
            lookup |= Q(title__icontains=search_item)
        # use lookup to filter post
        queryset = BlogPost.objects.all().filter(lookup)
        serializer = BlogPostSerializer(queryset , many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

# works
class BlogPostTagFilterView(APIView):
    def post(self, request):
        data = request.data
        tag = data.get('tag')
        queryset = BlogPost.objects.filter(tags__icontains=tag)
        serializer = BlogPostSerializer(queryset , many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

# works
class BlogPostListPopularView(ListAPIView):
    # we only want the post within the last 7 days
    queryset = BlogPost.objects.all().filter(date_created__range=[timezone.now() - timezone.timedelta(7) , timezone.now()]).order_by('-views')[:4]
    serializer_class = BlogPostSerializer

# works
class BlogPostDetailView(APIView):
    def get(self, request , slug):
        try:
            queryset = BlogPost.objects.get(slug__iexact=slug)
            queryset.views += 1
            queryset.save()
            serializer = BlogPostSerializer(queryset)
            return Response(serializer.data , status=status.HTTP_200_OK)
        except BlogPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)