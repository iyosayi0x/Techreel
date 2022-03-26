# Generated by Django 4.0.3 on 2022-03-24 13:30

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField()),
                ('tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('TECH', 'Tech'), ('COMPUTERS', 'Computers'), ('PHONES', 'Phones'), ('EARNING', 'Earning'), ('PROGRAMMING', 'Programming')], default='TECH', max_length=30), size=None)),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='thumbnails')),
                ('exert', models.TextField()),
                ('content', models.TextField()),
                ('featured', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='authors.author')),
            ],
        ),
    ]
