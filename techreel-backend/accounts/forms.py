from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth import get_user_model


Account = get_user_model()


class AccountCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="password" , widget=forms.PasswordInput)
    password2 = forms.CharField(label='re_password' , widget=forms.PasswordInput)

    class Meta:
        model = Account
        fields = ('username','email',)

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        return password2

    def save(self , commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class AccountChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = Account
        fields = ('email', 'username' , 'password' , 'superuser' , 'staff' , 'is_active',)