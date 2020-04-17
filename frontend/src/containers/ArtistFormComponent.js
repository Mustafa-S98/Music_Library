import { Form, DatePicker, Input, Button } from 'antd';
import React from 'react';
import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


class ArtistFormComponent extends React.Component{

  constructor(props){
    super(props);
    
    this.inputHandle = this.inputHandle.bind(this);
    this.send = this.send.bind(this);

    this.state = {
     };
  }

inputHandle(e){
  console.log(e.target)
  this.setState({[e.target.name]: e.target.value})
}

handleDateChange = value => {
  if (value && value.isValid()) {
    this.setState({
      dob: value,
    });
  }
};

  send(){
    console.log(this.state)

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/add_artist/',
      data: this.state,
    });
}

    render(){
        return (
            <Form
              {...layout}
              title="Add Artist"
              name="basic"
              initialValues={{
                remember: true,
              }}
            >
              <h1>Add Artist</h1>
              <Form.Item
                label="Name of Artist"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the name',
                  },
                ]}
              
              >
                <Input name="name" onInput={e => this.inputHandle(e)} />
              </Form.Item>
        
              <Form.Item name="dob" label="Date of Birth">
                <DatePicker format="YYYY-MM-DD" onChange={(val) => this.setState({ dob: val })} />
              </Form.Item>
        
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={ this.send }>
                  Add
                </Button>
              </Form.Item>
            </Form>
          )
        }
}


export default ArtistFormComponent;