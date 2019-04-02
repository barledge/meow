# Generated by Django 2.0.4 on 2019-04-01 23:22

from django.db import migrations
from datetime import datetime
import csv
import pytz

from scheduler.models import SMPost, Section

def utc_time(string):
    d = None if not string.strip() else datetime.strptime(string[:string.rfind(".")], '%Y-%m-%d %H:%M:%S')
    if not d: return None
    pst = pytz.utc
    d = pst.localize(d)
    return d

def import_old_sm_posts(apps, schema_editor):
    # this is technically the right thing to do but
    # we don't have access to the create method then
    # SMPost = apps.get_model('scheduler', 'SMPost')
    # print("got here")
    # Section = apps.get_model('scheduler', 'Section')
    # first create the sections so the ids are right
    # Dangerous drop everything inside the sections table
    Section.objects.all().delete();
    Section.objects.create(
        id=1,
        name="Daily Bruin",
        twitter_account_handle="dailybruin",
        facebook_account_handle="Daily Bruin",
    );
    Section.objects.create(
        id=3,
        name="Opinion",
        twitter_account_handle="DBOpinion",
        facebook_account_handle=None,
    );
    Section.objects.create(
        id=4,
        name="Sports",
        twitter_account_handle="DBSports",
        facebook_account_handle=None,
    );
    Section.objects.create(
        id=5,
        name="Arts",
        twitter_account_handle="DailyBruinAE",
        facebook_account_handle=None,
    );

    with open('meow/scheduler/migrations/old_smpost_data.csv', 'rt') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        first = True
        for row in spamreader:
            # "id","slug","pub_date","pub_time","story_url","story_short_url",
            #"featured_image_url","post_twitter","post_facebook",
            #"pub_ready_copy","pub_ready_online","sent","sending",
            #"sent_time","sent_error","sent_error_text","last_edit_user_id","pub_ready_copy_user_id","pub_ready_online_user_id","section_id","send_now","id_facebook","id_twitter","post_instagram","post_notes"
            if first:
                first = False
                continue



            SMPost.objects.create(
                #id is automatically created
                slug=row[1],
                pub_date=datetime.strptime(row[2], "%Y-%m-%d"),
                pub_time=datetime.strptime(row[3][:row[3].rfind('.')], "%H:%M:%S"),
                story_url=row[4],
                story_short_url=row[5],
                featured_image_url=row[6],
                post_twitter=row[7],
                post_facebook=row[8],
                pub_ready_copy=row[9] == 'True',
                pub_ready_online=row[10] == 'True',
                sent=row[11] == 'True',
                sending= row[12] == 'True',
                sent_time= utc_time(row[13]),
                sent_error = row[14] == 'True',
                sent_error_text = row[15],
                last_edit_user=None,
                pub_ready_copy_user=None,
                pub_ready_online_user_id =None,
                section_id= None if not row[19] else int(row[19]),
                send_now= row[20] == 'True',
                id_facebook = 0 if not row[21].isdigit() else int(row[21]),
                id_twitter = 0 if not row[22].isdigit() else int(row[22]),
                post_instagram="",
                post_notes=row[24],
            )

class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0005_auto_20190326_1117'),
    ]

    operations = [
        migrations.RunPython(import_old_sm_posts)
    ]
