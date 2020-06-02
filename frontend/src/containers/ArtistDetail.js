import React from 'react';
import axios from 'axios';
import './App.css';

import plot from './plot.png';
import stats from './stats.png';

import { Descriptions } from 'antd';


class ArtistDetail extends React.Component{

  state = {
    artist : {},
    song : [],
    plot, stats
  }

  componentDidMount(){
      const artistID = this.props.match.params.artistID;
      var art_song = [];
      axios.get(`http://127.0.0.1:8000/api/plot/${artistID}`)
    axios.get(`http://127.0.0.1:8000/api/artist/${artistID}`)
      .then(res => {
        this.setState({
          artist : res.data
        });
        this.state.artist.songs.map((song, i) => (
            art_song.push(`"${song.name}"   \n`)
        ))
      })

    this.setState({
        song: art_song
    });
    console.log(this.state.song)
  }

  render(){
    return(         
          <Descriptions title="Artist Info" column={2}>
            <Descriptions.Item label="Name" className="App-label">{this.state.artist.name}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth" className="App-label">{this.state.artist.dob}</Descriptions.Item>
            <Descriptions.Item label="Rating" className="App-label">{this.state.artist.rating}</Descriptions.Item>
            <Descriptions.Item label="Songs" className="App-label">{this.state.song}</Descriptions.Item>
            <Descriptions.Item label="Plot" className="App-label"><img src={ plot } alt="plot" /></Descriptions.Item>
            <Descriptions.Item label="Stats" className="App-label"><img src={ stats } alt="stats" /></Descriptions.Item>
          </Descriptions>
    )
  }
}

export default ArtistDetail;