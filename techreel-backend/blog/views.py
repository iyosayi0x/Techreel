from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .models import BlogPost
from .serializers import BlogPostSerializer, SiteMapBlogListSerializer, BlogPostSerializer_List
from django.db.models import Q
from django.utils import timezone
from .utils import BlogPostPagination


class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(
        featured=True).order_by('-date_created')
    serializer_class = BlogPostSerializer_List


class BlogPostListView(ListAPIView):
    pagination_class = BlogPostPagination
    queryset = BlogPost.objects.all().filter(
        featured=False).order_by('-date_created')
    serializer_class = BlogPostSerializer_List


class BlogPostSearchView(APIView):
    def post(self, request):
        data = request.data
        search_term = data.get('search_term', None)
        if search_term is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        search_term_list = search_term.split()
        lookup = Q()
        # loop over search terms
        for search_item in search_term_list:
            lookup |= Q(title__icontains=search_item)
        # use lookup to filter post
        queryset = BlogPost.objects.all().filter(lookup)
        serializer = BlogPostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogPostTagFilterView(APIView):
    def post(self, request):
        data = request.data
        tag = data.get('tag', None)
        if tag is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        queryset = BlogPost.objects.filter(tags__icontains=tag)
        serializer = BlogPostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogPostListPopularView(ListAPIView):
    # we only want the post within the last 7 days
    queryset = BlogPost.objects.all().filter(date_created__range=[
        timezone.now() - timezone.timedelta(7), timezone.now()]).order_by('-views')[:3]
    serializer_class = BlogPostSerializer


class BlogPostDetailView(APIView):
    def get(self, request, slug):
        try:
            queryset = BlogPost.objects.get(slug__iexact=slug)
            queryset.views += 1
            queryset.save()
            serializer = BlogPostSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except BlogPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class BlogPostListSitemapView(ListAPIView):
    queryset = BlogPost.objects.all().order_by('title')
    serializer_class = SiteMapBlogListSerializer


class BlogPostSimilarView(APIView):
    def post(self, request):
        data = request.data
        tags = data.get('tags', None)
        slug = data.get('slug', None)

        if tags is None or slug is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        lookup = Q()
        # loop over tags
        for tag in tags:
            lookup |= Q(tags__icontains=tag)

        queryset = BlogPost.objects.filter(lookup).order_by(
            '-views').filter(~Q(slug=slug))[:3]
        serializer = BlogPostSerializer_List(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
