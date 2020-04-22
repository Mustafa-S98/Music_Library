import React from 'react';
import axios from 'axios';

class GenreComponent extends React.Component{

    constructor(props){
        super(props);

        this.send = this.send.bind(this);
    
        this.state = {
            songs : []
         };
      }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/genre/')
    }

    render(){
        return(
            "Hello"
        )
    }

}

export default GenreComponent;