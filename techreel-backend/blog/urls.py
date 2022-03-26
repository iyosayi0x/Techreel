from django.urls import path
from .views import BlogPostDetailView , BlogPostListView , BlogPostFeaturedView , BlogPostSearchView , BlogPostListPopularView , BlogPostTagFilterView

urlpatterns = [
    path('', BlogPostListView.as_view()),
    path('featured/', BlogPostFeaturedView.as_view()),
    path('search/', BlogPostSearchView.as_view()),
    path('popular/' , BlogPostListPopularView.as_view()),
    path('tag/' , BlogPostTagFilterView.as_view()),
    path('<str:slug>/', BlogPostDetailView.as_view()),
]