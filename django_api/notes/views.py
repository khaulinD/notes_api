from django.core.cache import cache
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters.notes_filter import NoteFilters
from .models import Notes, Comments
from .serializers.notes_serializers import NotesSerializer
from .serializers.comments_serializer import CommentsSerializer


class NotesViewSet(viewsets.ViewSet):
    # queryset = Notes.objects.order_by('-id').select_related().all()
    queryset = Notes.objects.prefetch_related(
                    'extra_user',  # Fetch extra_user related data
                    'notetouser_set'  # Fetch NoteToUser related data
                ).order_by('-id').all()
    serializer_class = NotesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = NoteFilters
    permission_classes = [IsAuthenticated]

    # def __init__(self,*args, **kwargs):
    #     super().__init__(*args,**kwargs)
    #     print(args,kwargs)
    #     self.note_cache_prefix = None
    #     self.note_cache_name_inBasket = None

    def list(self, request):
        note_cache_prefix = f'note_{request.query_params["creator"][0]}_'
        note_cache_name_inBasket = f'{note_cache_prefix}{request.query_params["is_in_basket"].title()}'
        note_cache = cache.get(note_cache_name_inBasket)

        if note_cache:
            queryset = note_cache
            print(f'Exist {note_cache_prefix}{request.query_params["is_in_basket"].title()}')
        else:
            print(f'{note_cache_prefix}{request.query_params["is_in_basket"].title()}')
            queryset = self.filterset_class(request.GET, self.queryset).qs
            cache.set(note_cache_name_inBasket, queryset, 10)
        serializer = NotesSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        note_cache_prefix = note_cache_prefix = f'note_{request.data["creator"]}_'
        # Check if the data is valid
        if serializer.is_valid():
            # Save the object to the database
            serializer.save()

            # Create a response dictionary with the created object's data
            response_data = {
                'message': 'Note created successfully',
                'data': serializer.data
            }
            # Return a success response with the response data and a status code of 201 (Created)
            print("Delete ", note_cache_prefix+"False")
            cache.delete(note_cache_prefix+"False")
            return Response(response_data, status=status.HTTP_201_CREATED)

        # If the data is not valid, return a response with the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #
    # def retrieve(self, request, pk=None):
    #     queryset = Notes.objects.all()
    #     user = get_object_or_404(queryset, pk=pk)
    #     serializer = NotesSerializer(user)
    #     return Response(serializer.data)

    def update(self, request, pk=None):
        note = get_object_or_404(self.queryset, id=pk)
        # Обновить запись с данными из запроса
        serializer = NotesSerializer(note, data=request.data, partial=True)
        note_cache_prefix = note_cache_prefix = f'note_{request.data["creator"]}_'
        if serializer.is_valid():
            serializer.save()
            if 'is_in_basket' not in request.data:
                print("Delete ", note_cache_prefix + "False")
                cache.delete(f'{note_cache_prefix}False')
            else:
                print("Delete ", f'{note_cache_prefix}{not request.data["is_in_basket"]}')
                cache.delete(f'{note_cache_prefix}{not request.data["is_in_basket"]}')
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        # Найти запись по title
        note = get_object_or_404(self.queryset, pk=pk)
        note_cache_prefix = f'note_{note.creator.id}_'

        # Удаление существующей записи
        note.delete()
        # print(f'{self.note_cache_prefix}{not request.data["is_in_basket"]}')
        cache.delete(f'{note_cache_prefix}True')
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentViewSet(viewsets.ViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the object to the database
            serializer.save()

            # Create a response dictionary with the created object's data
            response_data = {
                'message': 'Comment created successfully',
                'data': serializer.data
            }

            # Return a success response with the response data and a status code of 201 (Created)
            return Response(response_data, status=status.HTTP_201_CREATED)

        # If the data is not valid, return a response with the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #
    def destroy(self, request, pk=None):
        comment = get_object_or_404(self.queryset, pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





# class NotesBasketViewSet(viewsets.ViewSet):
#     queryset = NotesBasket.objects.all()
#     serializer_class = NotesBasketSerializer
#
#     def list(self, request):
#         serializer = self.serializer_class(self.queryset, many=True)
#         return Response(serializer.data)