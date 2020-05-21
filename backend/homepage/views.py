from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json

from .models import Artist, Songs

from operator import itemgetter

# def index(request):
#     artist_list = Artist.objects.all()[:10]
#     song_list = Songs.objects.all()[:10]
#     template = loader.get_template('home/index.html')
#     context = json.dumps({
#         'artist_list' : artist_list,
#         'song_list' : song_list,
#     })
#     return HttpResponse(template.render(context, request))