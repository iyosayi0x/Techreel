from .views import NewsLetterSignUpView
from django.urls import path

urlpatterns = [
    path('signup/', NewsLetterSignUpView.as_view())
]
