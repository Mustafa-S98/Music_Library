## Project : Music Webapp




## Table of contents :

### [ Technology stack ](#technologies-used)

### [ Project Description ](#project-description)

### [ Features ](#features)

### [ Database Models ](#database-models)

### [ URLs ](#urls)

### Technologies Used :

Python (3.6.9)

pip (9.0.1)

django (3.0.4)

djangorestframework (3.11.0)

Node.js (8.10.0)

npm (3.5.2)

react (16.13.1)

Ant-d (3.0.0)



## Project Description :
In this project I developed a webapp using React and Django.
React was used for frontend development and django was used for backend development, and the workflow between them was managed via API calls.

For handling API calls in django, I used 'djangorestframework' module.

In this webapp, basically I developed a music library app, similar to Spotify and all, in which on homepage we can see a list of top songs and artists based on ratings, also one can see details of a song or an artist by clicking on the corresponding name from homepage.

There is also a feature of adding a song and an artist.

Also there is a feature of assigning rating of a song, from homepage.

The rating of artist is average of the ratings over his / her songs, it is read only (as it is based on the ratings on his / her songs) and is displayed besides their name on homepage.

There is also session recording working in background using which there is an implementation of suggested songs as per the user's previous session searches.

Also there is data science module which is plotting graphs for each artist based on number of hits and flops.



## Features :

Easy to use UI

Templated design

Well structured source code

Modular approach in project development

MVC architecture used

Separate frontend and backend, connected via API calls, therefore support future updations and technology stack changes

Song and artist adding functionality

Rating functionality

Forms with validations

Suggested songs implementation as per user

Data science and graphs to show number of hits and flops per artist. 



## Database Models :

      Artist(
        id (primary key, integer), 
        name (char, max-length = 40), 
        dob (date),
        rating (float)
      )


      Songs(
        id (primary key, integer), 
        name (char, max-length = 50), 
        dor (date),
        number_of_votes (integer),                  (Its significance is in calculating average rating in case user updates existing rating)
        average_rating (float)
      )

      Users(
        id (primary key, integer),
        name (char, max-length = 40)
        genre (char, max-length = 20)
      )

**[ Songs and Artist have many to many relationship between Artist and Songs ]**



## Updations possible :

Add a chatbot to give better UI experience to users.

Provide an interface via which songs can be streamed as well.

Can provide lyrics of songs as well using the APIs providing this functionality. (Is not implemented at the moment, as most of those APIs are paid.)



## References :

Django-rest framework official docs

Stackoverflow

Geeksforgeeks

ant-d docs

react docs


------------------------------------------------------------------------------------------------------------
  > Snippets of program run are present in folder named **" Snippets "** folder present at root directory.
------------------------------------------------------------------------------------------------------------