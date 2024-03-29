from django_filters import rest_framework as filters

from ..models import Notes


class NoteFilters(filters.FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    text = filters.CharFilter(field_name='text', lookup_expr='icontains')
    creator = filters.NumberFilter(field_name="creator", lookup_expr='exact')
    is_in_basket = filters.BooleanFilter(field_name="is_in_basket")
    class Meta:
        model = Notes
        fields = ["title", "text", "creator" ,"is_in_basket"]