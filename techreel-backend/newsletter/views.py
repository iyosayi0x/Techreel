from rest_framework.views import APIView
from .models import News_Letter_User
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class NewsLetterSignUpView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email', None)
        normalized_email = email.strip().lower()

        if email is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            # user exists ? ->  return error
            News_Letter_User.objects.get(email=normalized_email)
            context = {
                'description': {
                    'error': 'User is already subscribed'
                }
            }
            return Response(context, status=status.HTTP_200_OK)

        # user does not exist ?  add user to newsletter -> return success
        except News_Letter_User.DoesNotExist:
            News_Letter_User.objects.create(email=normalized_email)
            context = {
                'description': {
                    'success': "User successfully subscribed to newsletter"
                }
            }
            return Response(context, status=status.HTTP_200_OK)
