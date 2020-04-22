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

class Plot(APIView):

    def get(self, request, id):

        import matplotlib.pyplot as plt

        hits = 0
        flops = 0
        song_lst = Songs.objects.all().filter(artists = id)
        for i in song_lst:
            if i.average_rating > 2.5:
                hits += 1
            else:
                flops += 1

        labels = ['Hits', 'Flops']
        sizes = [hits, flops]
        colors = ['green', 'lightcoral']
        plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True)
        centre_circle = plt.Circle((0,0),0.75,color='black', fc='white',linewidth=1.25)
        fig = plt.gcf()
        fig.gca().add_artist(centre_circle)
        plt.axis('equal')
        plt.savefig('../frontend/src/containers/plot.png')
        return Response("200")

class SimpleView(APIView): 
   def post(self, request):
       ar = Artist(name=request.data['name'], dob= request.data['dob'][:10], rating= 0.0)
       ar.save()
       return Response("Simple")


class Song_addView(APIView): 
   def post(self, request):
       s = Songs(name=request.data['name'], dor= request.data['dor'][:10], genre= request.data['genre'], number_of_votes= 0, average_rating= request.data['rating'])
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