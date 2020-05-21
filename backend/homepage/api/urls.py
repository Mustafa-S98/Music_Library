from django.urls import path

from .views import ArtistView, ArtistDetailView, SongView, SongDetailView, SimpleView, Song_addView, Plot, UserView, UpdateGenre, StatsView

urlpatterns = [
    path('artist/', ArtistView.as_view()),
    path('artist/<pk>', ArtistDetailView.as_view()),
    path('song/', SongView.as_view()),
    path('song/<pk>', SongDetailView.as_view()),
    path('add_artist/', SimpleView.as_view()),
    path('add_song/', Song_addView.as_view()),
    path('plot/<int:id>', Plot.as_view()),
    path('users/', UserView.as_view()),
    path('update_genre/', UpdateGenre.as_view()),
    path('stats/', StatsView.as_view())
]