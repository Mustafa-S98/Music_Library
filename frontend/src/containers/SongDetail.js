import React from 'react';
import axios from 'axios';
import './App.css';

import { Descriptions } from 'antd';

class SongDetail extends React.Component{

  state = {
    song : {}
  }

  componentDidMount(){
      const songID = this.props.match.params.artistID;
    axios.get(`http://127.0.0.1:8000/api/song/${songID}`)
      .then(res => {
        this.setState({
          song : res.data
        });
        console.log("Artist : ")
        console.log(this.state.song)
      })
  }

  render(){
    return(
            
          <Descriptions title="Song Info">
            <Descriptions.Item label="Name" className="App-label">{this.state.song.name}</Descriptions.Item>
    <Descriptions.Item label="Date Of Release" className="App-label">{this.state.song.dor}</Descriptions.Item>
    <Descriptions.Item label="Average Rating" className="App-label">{this.state.song.average_rating}</Descriptions.Item>
          </Descriptions>
    )
  }
}

export default SongDetail;