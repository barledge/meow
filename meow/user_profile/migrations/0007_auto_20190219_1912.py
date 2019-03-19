# Generated by Django 2.0.4 on 2019-02-20 03:12

from django.db import migrations

def add_name(apps, schema_editor):
    Theme = apps.get_model("user_profile", "Theme")
    
    default = Theme.objects.get(id=1)
    default.name = "Daily Bruin"
    default.save()

    dark = Theme.objects.get(id=2)
    dark.name = "Dark Bruin"
    dark.save()



class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0006_auto_20190219_1849'),
    ]

    operations = [
        migrations.RunPython(add_name)
    ]