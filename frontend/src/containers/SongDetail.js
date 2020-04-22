import React from 'react';
import axios from 'axios';
import './App.css';

import { Descriptions } from 'antd';
import UserProfile from './UserSession';

class SongDetail extends React.Component{

  state = {
    song : {}
  }

  componentDidMount(){
      const songID = this.props.match.params.songID;
    axios.get(`http://127.0.0.1:8000/api/song/${songID}`)
      .then(res => {
        this.setState({
          song : res.data
        });
      })
      UserProfile.set_search(songID);
  }

  render(){
    return(
            
          <Descriptions title="Song Info">
            <Descriptions.Item label="Name" className="App-label">{this.state.song.name}</Descriptions.Item>
    <Descriptions.Item label="Date Of Release" className="App-label">{this.state.song.dor}</Descriptions.Item>
    <Descriptions.Item label="Genre" className="App-label">{this.state.song.genre}</Descriptions.Item>
    <Descriptions.Item label="Average Rating" className="App-label">{this.state.song.average_rating}</Descriptions.Item>
          </Descriptions>
    )
  }
}

export default SongDetail;