from django_filters import rest_framework as filters

from ..models import Sharing

class SharingFilter(filters.FilterSet):
    users__username = filters.CharFilter(field_name='users__username', lookup_expr='icontains')

    class Meta:
        model = Sharing
        fields = ['users__username', "note", "can_edit"]