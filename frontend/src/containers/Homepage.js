import React from 'react';
import Artist from '../components/Artist';
import axios from 'axios';

import { Tag, Rate } from 'antd';
import Song from '../components/Song';


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
              <Tag color={color} key={tag}>
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
      render: (val) => <Rate allowHalf defaultValue={val.average_rating} disabled />,
    },
  ];

function send(val){
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/update_rating/',
    data: val
  }).then(console.log(val));
};

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
    title: 'Average Rating',
    dataIndex: 'average_rating',
    key: 'average_rating',
  },
  {
    title: 'Rating',
    dataIndex: ['id', 'average_rating'],
    key: 'rating',
  render: (text, val) => <Rate allowHalf defaultValue={val.average_rating} onClick={console.log(val.id, text)} />,
  },
];
  

class Homepage extends React.Component{

  state = {
    artists : [],
    songs: []
  }

  componentDidMount(){
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
  }


  render(){
    return(
      <div>
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