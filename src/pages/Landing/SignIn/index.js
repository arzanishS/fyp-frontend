import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import './styles.scss'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { openNotification } from '../../../helpers'
import { useHistory, Redirect, useLocation } from 'react-router-dom'

const SignIn = () => {
  const history = useHistory()
  const userAuth = localStorage.getItem('token')
  const location = useLocation()
  const onFinish = (values) => {
    axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/signin`, values)
      .then(response => {
        openNotification('Login Successfully')
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userAuth', JSON.stringify(response.data.user))
        history.push('/')
        window.location.reload()
      })
      .catch(error => {
        openNotification('invalid credential')
      })
  }

  return (
    userAuth
      ? <Redirect to={{ pathname: '/', state: { from: location } }} />
      : <div className='container flexCol just-center align-center'>
        <div className='glass-landing'>
          <div style={{ paddingBlock: 5, paddingInline: 20 }}>
            <div id='sign-in'>
              <h1 style={{ textAlign: 'center', color: 'white' }}>Sign In</h1>
              <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name='email'
                  rules={[{ required: true, message: 'Please input your email phone!' }]}
                >
                  <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email, Mobile No' />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button style={{ backgroundColor: '#FEBF43', border: 'none' }} htmlType='submit' className='login-form-button'>
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p style={{ color: 'white', textAlign: 'center' }}>Don't Have an account <b onClick={() => history.push('/register')} style={{ cursor: 'pointer' }}>Sign Up</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SignIn
