from django_filters import rest_framework as filters

from notes.models import NoteToUser

class SharingFilter(filters.FilterSet):
    user__username = filters.CharFilter(field_name='note__creator__username', lookup_expr='exact')

    class Meta:
        model = NoteToUser
        fields = ['user__username', "note", "can_edit"]