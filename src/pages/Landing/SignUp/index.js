import React from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import './styles.scss'
import { openNotification } from '../../../helpers'
import { useHistory, useLocation, Redirect } from 'react-router-dom'

const SignUp = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const userAuth = localStorage.getItem('token')
  const location = useLocation()
  const onFinish = (values) => {
    delete values.confirm
    axios.post(`${process.env.REACT_APP_BACKEND}/api/users/addUser`, values)
      .then(response => {
        if (response.data.success === true) {
          openNotification('Registered Successfully')
          history.push('/login')
        } else {
          openNotification(response.data.msg)
        }
      })
      .catch(error => {
        openNotification(error.response.data.msg)
      })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 20 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 24 },
      xl: { span: 24 }
    }
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 10
      }
    }
  }

  return (
    userAuth ? <Redirect to={{ pathname: '/', state: { from: location } }} />
      : <div className='container flexCol just-center align-center'>
      <div className='glass-landing'>
        <div style={{ paddingBlock: 5, paddingInline: 20 }}>
          <div id='sign-up'>
            <h1 style={{ textAlign: 'center', color: 'white' }}>Sign Up</h1>
            <Form
              {...formItemLayout}
              form={form}
              name='register'
              onFinish={onFinish}
              scrollToFirstError
              labelAlign='left'
            >
              <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please input your Name!' }]}
              >
                <Input name='name' style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name='email'
                label='E-mail'
                rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='phone'
                label='Phone Number'
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input placeholder='XXXXXXXXXXX' name='phone' style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator (_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  }
                })
              ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button style={{ backgroundColor: '#FEBF43', border: 'none' }} htmlType='submit'>
                Register
              </Button>
              </Form.Item>
            </Form>
            <div>
              <p style={{ color: 'white', textAlign: 'center' }}>Have an account <b onClick={() => history.push('/login')} style={{ cursor: 'pointer' }}>Sign In</b></p>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default SignUp
