# Generated by Django 4.0.3 on 2022-04-03 01:47

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_alter_blogpost_author_alter_blogpost_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='tags',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('tech', 'Tech'), ('computers', 'Computers'), ('phones', 'Phones'), ('earning', 'Earning'), ('programming', 'Programming'), ('reviews', 'Reviews'), ('dev', 'Dev'), ('gadgets', 'Gadgets')], default='tech', max_length=30), size=None),
        ),
    ]
