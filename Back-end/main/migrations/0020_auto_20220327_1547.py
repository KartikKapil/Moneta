# Generated by Django 3.2.5 on 2022-03-27 15:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_auto_20210826_1709'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='Account_Bal',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Account_Holder',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Account_ID',
        ),
        migrations.RemoveField(
            model_name='student',
            name='PAN_number',
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='Account_Bal',
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='Account_Holder',
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='Account_ID',
        ),
        migrations.RemoveField(
            model_name='vendor',
            name='PAN_number',
        ),
    ]
