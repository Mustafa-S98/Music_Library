import React from 'react';
import { Route } from 'react-router-dom';

import Homepage from './containers/Homepage';
import ArtistDetail from './containers/ArtistDetail';
import SongDetail from './containers/SongDetail';
import ArtistFormComponent from './containers/ArtistFormComponent';
import SongFormComponent from './containers/SongFormComponent';
import GenreComponent from './containers/GenreComponent';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/artist/:artistID' component={ArtistDetail} />
        <Route exact path='/song/:songID' component={SongDetail} />
        <Route exact path='/add_artist/' component={ArtistFormComponent} />
        <Route exact path='/add_song/' component={SongFormComponent} />
        <Route exact path='/genres/:genre' component={GenreComponent} />
    </div>
);

export default BaseRouter;