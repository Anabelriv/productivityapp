from django.contrib import admin
from .models import Goals


class GoalsAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")


# Register model

admin.site.register(Goals, GoalsAdmin)
