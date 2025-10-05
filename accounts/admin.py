from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'online', 'last_seen']
    list_filter = ['online', 'is_staff', 'is_superuser']
    fieldsets = UserAdmin.fieldsets + (
        ('Informations supplémentaires', {
            'fields': ('online', 'avatar', 'bio', 'last_seen')
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)