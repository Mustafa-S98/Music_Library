from django.db import models


class Songs(models.Model):
    name = models.CharField(max_length = 50)
    dor = models.DateField()
    number_of_votes = models.IntegerField(default = 0)
    average_rating = models.FloatField(default = 0.0)

    class Meta:
        ordering = ['average_rating']

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length = 40)
    dob = models.DateField()
    songs = models.ManyToManyField(Songs, related_name = 'artists', blank = True)
    rating = models.FloatField(default = 0.0)
    class Meta:
        ordering = ['name']
    

    def __str__(self):
        return self.name