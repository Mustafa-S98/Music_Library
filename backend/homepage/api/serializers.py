from rest_framework import serializers
from homepage.models import Artist, Songs

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ('id', 'name', 'dor', 'average_rating')

class ArtistSerializer(serializers.ModelSerializer):
    songs = SongSerializer(read_only=True, many=True)

    class Meta:
        model = Artist
        fields = ('id', 'name', 'dob', 'songs', 'rating')

