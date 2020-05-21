import React from 'react';
import Artist from '../components/Artist';
import axios from 'axios';

import { Tag, Rate } from 'antd';
import Song from '../components/Song';
import UserProfile from './UserSession';


const ar_columns = [
    {
      title: 'Name',
      dataIndex: ['name', 'id'],
      key: 'name',
    render: (text, val) => <a href={'http://localhost:3000/artist/'+val.id}>{val.name}</a>,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Songs',
      key: 'songs',
      dataIndex: 'songs',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag.id}>
                {tag.name}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text, val) => <Rate allowHalf defaultValue={val.rating} disabled />,
    },
  ];

// function send(val){
//   axios.post('http://127.0.0.1:8000/api/update_rating/', {val});
// };

const so_columns = [
  {
    title: 'Name',
    dataIndex: ['name', 'id'],
    key: 'name',
  render: (text, val) => <a href={'http://localhost:3000/song/'+val.id}>{val.name}</a>,
  },
  {
    title: 'Date of Release',
    dataIndex: 'dor',
    key: 'dor',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Average Rating',
    dataIndex: 'average_rating',
    key: 'average_rating',
  },
  {
    title: 'Rating',
    dataIndex: ['id', 'average_rating'],
    key: 'rating',
  render: (text, val) => <Rate allowHalf defaultValue={val.average_rating} />,
  },
];

var sign;
  

class Homepage extends React.Component{

  state = {
    artists : [],
    songs: [],
    genre: '',
    top_artist: '',
    max_voted_song: '',
  }

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/stats/').then(res => {
      this.setState({
        top_artist : res.data.most_rated_artist,
        max_voted_song : res.data.most_voted_song
      });
    })

    axios.get('http://127.0.0.1:8000/api/artist/')
      .then(res => {
        this.setState({
          artists : res.data
        });
      })

      axios.get('http://127.0.0.1:8000/api/song/')
      .then(resp => {
        this.setState({
          songs : resp.data
        });
      })
    
    var arr = "";
    if(UserProfile.getId() !== ""){
      axios.get('http://127.0.0.1:8000/api/users')
      .then(res => {
        res.data.map( (val) => {
          if(val.name === UserProfile.getId()){
            this.setState({
              genre : val.genre
            });
          }
        })
        console.log(this.state.genre);
      }).then(() => {
        this.state.songs.map( (val) => {
          if(this.state.genre === val.genre){ arr = arr + val.name + " , "; }
        });
        console.log(arr)
      }).then(() => {sign = <span><h1><p>Your preference of songs : { arr }</p></h1></span>});
    }
  }


  render(){
    return(
      <div>
        <span> <h1> Top rated artist : </h1> {this.state.top_artist} </span>
        <span> <h1> Maximum voted song : </h1> {this.state.max_voted_song} </span>
        <hr></hr>
        <span> {sign} </span>
        <hr></hr>
        <span><h1><p>Top 10 Artists</p></h1></span>
        <Artist col={ar_columns} data={this.state.artists} />
        <br />
        <br />
        <span><h1><p>Top 10 Songs</p></h1></span>
        <Song col={so_columns} data={this.state.songs} />
      </div>
    )
  }
}


export default Homepage;