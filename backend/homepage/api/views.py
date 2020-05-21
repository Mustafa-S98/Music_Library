from django.http import HttpResponseRedirect
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from django.db.models import Max

from homepage.models import Artist, Songs, Users
from .serializers import ArtistSerializer, SongSerializer, UsersSerializer

from rest_framework.response import Response
from rest_framework.parsers import JSONParser
import json

class ArtistView(ListAPIView):
    queryset = Artist.objects.all()[:10]
    serializer_class = ArtistSerializer

class UserView(ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

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

class UpdateGenre(APIView):

    def post(self, request):
        data = request.data['data']
        data = data.split('%')
        u = Users.objects.get(name = data[0])
        searches = [int(i) for i in data[1].split(',')]

        genres = []
        for i in searches:
            tmp = Songs.objects.get(id = i)
            genres.append(tmp.genre)
        print(genres)

        genre = dict()
        for i in genres:
            if i in genre.keys():
                genre[i] = genre[i] + 1
            else:
                genre[i] = 1
        print(genre)
        val = max(genre.values())
        for key, value in genre.items():
            if val == value:
                u.genre = key
                u.save()
                break

        return Response("200")

class Plot(APIView):

    def get(self, request, id):

        import matplotlib.pyplot as plt
        import seaborn as sns

        sns.set()

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
        
        plt.close()
        
        song_lst = Songs.objects.all().filter(artists = id).order_by('dor')
        x_val = []
        y_val = []

        for i in song_lst:
            x_val.append(i.name)
            y_val.append(i.average_rating)
        
        plt.plot(x_val, y_val, 'g-')
        plt.xlabel('Songs')
        plt.ylabel('Rating')
        plt.savefig('../frontend/src/containers/stats.png')

        plt.close()

        return Response("200")

class SimpleView(APIView): 
   def post(self, request):
       try:
           ar = Artist(name=request.data['name'], dob= request.data['dob'][:10], rating= 0.0)
           ar.save()
           return HttpResponseRedirect("http://localhost:3000")
       except:
            return Response("Validation of data failed")


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

       return HttpResponseRedirect("http://localhost:3000")


class StatsView(APIView):
    def get(self, request):
        import json

        data = dict()

        max_rated = Artist.objects.all().aggregate(Max('rating'))
        ar = Artist.objects.all().filter(rating = max_rated['rating__max'])
        data['most_rated_artist'] = ar[0].name

        song = Songs.objects.all().aggregate(Max('average_rating'))
        s = Songs.objects.all().filter(average_rating = song['average_rating__max'])
        data['most_voted_song'] = s[0].name

        return Response(data)