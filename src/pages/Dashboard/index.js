import React, { useState } from 'react'
import { Layout, Menu, Row, Col, Input, Button, Divider, Avatar, Drawer } from 'antd'
import Logo from '../../assets/marketlogo.png'
import { UserOutlined, LaptopOutlined, PlusOutlined, DashboardFilled, MenuOutlined } from '@ant-design/icons'
import './styles.scss'
import { useHistory } from 'react-router-dom'
import { general_cat } from '../../constants'
import { useMediaQuery } from 'react-responsive'
import dotenv from 'dotenv'
import { IonButtons, IonContent, IonHeader, IonPage } from '@ionic/react'
dotenv.config()

const { Header, Content, Sider } = Layout
const { Search } = Input

const Dashboard = ({ children }) => {
  const history = useHistory()
  const userAuth = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userAuth'))
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const [isDrawer, setIsDrawer] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    history.push('/login')
  }

  const onSearch = (val) => {
    if (val) {
      history.push(`/search/${val}`)
    } else {
      history.push('/')
    }
  }

  const selectCategory = (val) => {
    if (val) {
      history.push(`/${val}`)
    } else {
      history.push('/')
    }
  }

  return (
    <IonPage>
      <IonContent overflow-scroll='true' style={{ position: 'absolute' }}>
        <Layout>
          <Header style={{ backgroundColor: 'lightgrey', padding: 10, paddingLeft: 10, paddingRight: 10, height: 'auto' }}>
            <Row>
              <Col xs={8} sm={8} md={4} lg={4} xl={4}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isMobile && <MenuOutlined onClick={() => setIsDrawer(true)} />}
                  <img onClick={() => history.push('/')} src={Logo} style={{ width: 140, height: 'auto', objectFit: 'contain', cursor: 'pointer' }} alt='logo' />
                </div>
              </Col>
              <Col xs={12} sm={12} md={16} lg={16} xl={16} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search
                  placeholder='search ads'
                  enterButton
                  style={{ width: '50%' }}
                  onSearch={onSearch}
                />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {userAuth
                  ? <Button onClick={() => handleLogout()} type='primary'>Logout</Button>
                  : <Button onClick={() => history.push('/login')} type='primary'>Login</Button>}
              </Col>
            </Row>
          </Header>
          <Layout>
            {!isMobile && <Sider theme='light' collapsed={false} width={200}>
              {userAuth && <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10 }}>
                  <Avatar src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png' style={{ marginRight: 5 }} />
                  <div>{userInfo?.name}</div>
                </div>
                <Divider style={{ margin: 0 }} />
                <Menu
                  mode='inline'
                  defaultSelectedKeys={[history.location.pathname]}
                  style={{ borderRight: 0 }}
                >
                  <Menu.Item onClick={() => history.push('/')} icon={<DashboardFilled />} key='/'>Dashboard</Menu.Item>
                  <Menu.Item onClick={() => history.push('/edit-profile')} icon={<UserOutlined />} key='/edit-profile'>My Profile</Menu.Item>
                  <Menu.Item onClick={() => history.push('/my-ads')} icon={<LaptopOutlined />} key='my-ads'>My Ads</Menu.Item>
                </Menu>
                <Divider />

                <div style={{ padding: 10 }}>
                  <h3>CATEGORIES</h3>
                  {general_cat.map((item) => (
                    <div onClick={() => selectCategory(item)} style={{ cursor: 'pointer', color: '#1890ff' }}>{item}</div>
                  ))}
                </div>
              </>}

            </Sider>}
            <Drawer
              title='MarketPlace'
              placement='left'
              closable={false}
              onClose={() => setIsDrawer(false)}
              visible={isDrawer}
            >
              {userAuth && <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 10 }}>
                  <Avatar src='https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png' style={{ marginRight: 5 }} />
                  <div>{userInfo?.name}</div>
                </div>
                <Divider style={{ margin: 0 }} />
                <Menu
                  mode='inline'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ borderRight: 0 }}
                >
                  <Menu.Item onClick={() => history.push('/')} icon={<DashboardFilled />} key='1'>Dashboard</Menu.Item>
                  <Menu.Item onClick={() => { history.push('/edit-profile'); setIsDrawer(false) }} icon={<UserOutlined />} key='2'>My Profile</Menu.Item>
                  <Menu.Item onClick={() => { history.push('/my-ads'); setIsDrawer(false) }} icon={<LaptopOutlined />} key='3'>My Ads</Menu.Item>
                </Menu>
                <Divider />

                <div style={{ padding: 10 }}>
                  <h3>CATEGORIES</h3>
                  {general_cat.map((item) => (
                    <div onClick={() => selectCategory(item)} style={{ cursor: 'pointer', color: '#1890ff' }}>{item}</div>
                  ))}
                </div>
              </>}
              <>
              </>
            </Drawer>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                className='site-layout-background'
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: '100vh'
                }}
              >
                {children}
                <div className='fab-btn'>
                  <Button onClick={() => history.push(userAuth ? '/add-ad' : '/login')} type='primary' shape='circle' icon={<PlusOutlined />} size='large' />
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </IonContent>
    </IonPage>
  )
}

export default Dashboard
