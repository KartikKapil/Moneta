# Generated by Django 3.2.5 on 2021-08-04 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_document_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='Date',
        ),
        migrations.AddField(
            model_name='document',
            name='Day_of_name',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]