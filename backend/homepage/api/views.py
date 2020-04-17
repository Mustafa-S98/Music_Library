from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from homepage.models import Artist, Songs
from .serializers import ArtistSerializer, SongSerializer

from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import json

class ArtistView(ListAPIView):
    queryset = Artist.objects.all()[:10]
    serializer_class = ArtistSerializer


class ArtistDetailView(RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class SongView(ListAPIView):
    queryset = Songs.objects.all()[:10]
    serializer_class = SongSerializer


class SongDetailView(RetrieveAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongSerializer


from rest_framework.views import APIView
class SimpleView(APIView): 
   def post(self, request):
       ar = Artist(name=request.data['name'], dob= request.data['dob'][:10], rating= 0.0)
       ar.save()
       return Response("Simple")


class Song_addView(APIView): 
   def post(self, request):
       s = Songs(name=request.data['name'], dor= request.data['dor'][:10], number_of_votes= 0, average_rating= request.data['rating'])
       s.save()
       ar = Artist.objects.get(name = request.data['ar_name'])
       ar.songs.add(s)

       song = Songs.objects.all().filter(artists = ar.id)
       count = 0
       num = 0
       for i in song:
           count = count + i.average_rating
           num = num + 1
       
       ar.rating = count / num
       ar.save()

       return Response("Simple")