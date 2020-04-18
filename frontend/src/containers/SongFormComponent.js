import { Form, DatePicker, Input, Button, Rate, Select } from 'antd';
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
  
class SongFormComponent extends React.Component{

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
    

  

    send(){
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add_song/',
        data: this.state,
      });
    }
      
    render(){
        return (
                <Form
                    {...layout}
                    title="Add Song"
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <h1>Add Song</h1>
                    <Form.Item
                      label="Name of Song"
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
              
                    <Form.Item name="dor" label="Date of Release">
                      <DatePicker format="YYYY-MM-DD" onChange={(val) => this.setState({ dor: val })} />
                    </Form.Item>
      
                    <Form.Item
                      label="Name of Artist"
                      name="name_artist"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the name of artist',
                        },
                      ]}
                    ><Input name="ar_name" onInput={e => this.inputHandle(e)} />
                    </Form.Item>

                    <Form.Item
                      label="Genre"
                      rules={[
                        {required: true,
                        message: 'Please select a genre',}
                      ]}
                    >
                        <Select
                          placeholder="Select a genre"
                          onChange={ (val) => this.setState({ genre : val }) }
                        >
                          <Select.Option value="romantic">Romantic</Select.Option>
                          <Select.Option value="sad">Sad</Select.Option>
                          <Select.Option value="inspirational">Inspirational</Select.Option>
                          <Select.Option value="nationalism">Nationalism</Select.Option>
                          <Select.Option value="calm">Calm</Select.Option>
                        </Select>
                    </Form.Item>
      
                    <Form.Item name="rating" label="Rating">
                    <Rate allowHalf defaultValue={0.0} onChange={(val) => this.setState({ rating: val })} />
                    </Form.Item>
              
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit" onClick={this.send}>
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                )
              }
      }
      
export default SongFormComponent;