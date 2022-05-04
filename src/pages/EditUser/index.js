import React from 'react'
import { Form, Input ,Button } from 'antd';
import axios from 'axios'
import { openNotification } from '../../helpers';

const EditUser = () => {

  const [form] = Form.useForm();

  const data = JSON.parse(localStorage.getItem('userAuth'))

  const onFinish = (values) => {
    delete values.password
    values._id = data._id
    axios.post(`${process.env.REACT_APP_BACKEND}/api/users/updateUser`, values)
        .then(response => {
          if( response.data.success === true ) {
            openNotification('User Updated Successfully')
            localStorage.setItem('userAuth', JSON.stringify(response.data.user) )
          } else {
            openNotification(response.data.msg)
          }})
        .catch(error => {
            
        });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 16 },
      xl: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 10,
      },
    },
  };

  return (
    <div>
      <h1 style={{textAlign: 'center' }}>Update Profile</h1>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={data}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        labelAlign='left'
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input  name="name"  style={{ width: '100%' }} />
      </Form.Item>
      
      {/* <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input minLength={11} maxLength={11}  placeholder="XXXXXXXXXXX"  name="phone"  style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default EditUser
