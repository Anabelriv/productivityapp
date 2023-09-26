from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GoalsSerializer
from .models import Goals


class GoalsView(viewsets.ModelViewSet):
    serializer_class = GoalsSerializer
    queryset = Goals.objects.all()
