from django.contrib import admin
from .models import movie_posters, Cast

# Inline to show cast in movie admin
class CastInline(admin.TabularInline):
    model = movie_posters.cast.through  # ManyToMany join table
    extra = 1

@admin.register(movie_posters)
class MoviePostersAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'director', 'streaming_on')
    search_fields = ('title', 'director', 'genres')
    list_filter = ('release_date', 'streaming_on')
    inlines = [CastInline]

@admin.register(Cast)
class CastAdmin(admin.ModelAdmin):
    list_display = ('actor_name', 'image')
    search_fields = ('actor_name',)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import register

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import register

class RegisterAdmin(UserAdmin):
    model = register
    list_display = ('email', 'username', 'is_staff', 'is_superuser')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

admin.site.register(register, RegisterAdmin)

