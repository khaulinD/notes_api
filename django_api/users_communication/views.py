
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404, CreateAPIView
from rest_framework.response import Response
from celery_app import debug_task
from .serializers.feedback_serializer import FeedbackSerializer
from .task import process_feedback


# class SharingViewSet(viewsets.ViewSet):
#     queryset = NoteToUser.objects.select_related("note").select_related("user").all()
#     serializer_class = SharingSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_class = SharingFilterk
#
#     def list(self, request):
#         queryset = self.filterset_class(request.GET, self.queryset).qs
#         serializer = SharingSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         one_sharing_note = get_object_or_404(self.queryset, pk=pk)
#         serializer = SharingSerializer(one_sharing_note)
#         return Response(serializer.data)
#
#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)
#         # check_user = get_object_or_404(Account, username=request.data["users"])
#         # if check_user:
#         # Check if the data is valid
#         if serializer.is_valid():
#             # Save the object to the database
#             serializer.save()
#
#             # Create a response dictionary with the created object's data
#             response_data = {
#                 'message': 'Sharing has been successfully done',
#                 'data': serializer.data
#             }
#
#             # Return a success response with the response data and a status code of 201 (Created)
#             return Response(response_data, status=status.HTTP_201_CREATED)
#
#
#         # If the data is not valid, return a response with the validation errors
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeedbackView(CreateAPIView):
    serializer_class = FeedbackSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            feedback = serializer.save()
            process_feedback.delay(feedback.id)  # Call the Celery task
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
