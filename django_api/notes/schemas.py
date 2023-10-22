from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .serializers.notes_serializers import NotesSerializer

note_list_view = extend_schema(
    responses=NotesSerializer(many=True),
    parameters=[
        # OpenApiParameter(
        #     name="note_id",
        #     type=OpenApiTypes.INT,
        #     location=OpenApiParameter.QUERY,
        #     description="Note ID"
        #
        # ),
        OpenApiParameter(
            name="tilte",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Note title"

        ),

    ]
)