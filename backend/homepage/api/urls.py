from django.urls import path

from .views import ArtistView, ArtistDetailView, SongView, SongDetailView, SimpleView, Song_addView

urlpatterns = [
    path('artist/', ArtistView.as_view()),
    path('artist/<pk>', ArtistDetailView.as_view()),
    path('song/', SongView.as_view()),
    path('song/<pk>', SongDetailView.as_view()),
    path('add_artist/', SimpleView.as_view()),
    path('add_song/', Song_addView.as_view()),
]