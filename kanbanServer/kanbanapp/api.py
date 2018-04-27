from rest_framework import serializers, viewsets
from .models import Task

# serializers define API  representation


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('title', 'isDone', 'isDoing')

    def create(self, validated_data):
        user = self._context['request'].user
        task = Task.objects.create(user=user, **validated_data)
        return task

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.none()

    def get_queryset(self):
        user = self.request.user
        return Task.objects.all()
        # if user.is_anonymous:
        #     return Task.objects.none()
        # else:
        #     return Task.objects.filter(user=user)