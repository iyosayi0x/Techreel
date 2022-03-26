from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .forms import AccountCreationForm , AccountChangeForm
from django.contrib.auth.models import Group

# Register your models here.

Account=get_user_model()

class AccountAdmin(BaseUserAdmin):
    list_display = ('email' , 'username' , 'is_active' , 'superuser')
    list_filter = ('email',)
    form = AccountChangeForm
    add_form = AccountCreationForm

    fieldsets = (
        (None, {'fields': ('username' , 'email' , 'password',)}),
        ('Permissions', {'fields': ("superuser" , 'staff',)})
    )

    add_fieldsets = (
        (None , {
            'classes':('wide',),
            'fields' : ('email', 'username','password1', 'password2')
        }),
    )

    search_fields = ('email',)
    ordering = ('email' , 'username',)
    filter_horizontal = ()

admin.site.register(Account , AccountAdmin)
admin.site.unregister(Group)