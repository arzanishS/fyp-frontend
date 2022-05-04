import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Empty, Skeleton, Row , Col } from 'antd'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const MyAds = () => {
  const [adsData, setAdsData] = useState([])
  const [loading, setloading] = useState(true)
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('userAuth'))

  const fetchData = () => {
    setloading(true)
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/ads/getAdsByUser?id=${user._id}`,
    }).catch(error => {
      console.log(error)
    }).then(response => {
      setAdsData(response?.data)
      console.log(response?.data)
      setloading(false)
     })
  }

  const deleteAd = (id) => {
    setloading(true)
    axios({
      method: 'post',
      url: `${process.env.REACT_REACT_APP_BACKENDBACKEND}/api/ads/deleteAd?id=${id}`,
    }).catch(error => {
      console.log(error)
    }).then(response => {
      fetchData()
      console.log(response?.data)
      setloading(false)
     })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (

    
    <div style={{padding: 20}}>
      <>
        <div>
          {loading ? <Skeleton active /> : adsData && adsData.length < 1 ? 
            <Empty /> :
            <Row gutter={[0, 20]}>
            {adsData.map((sd, i) => (
              <Col key={i} xs={24} sm={24} md={12} lg={12} xl={6} xxl={8}>
                <Card
                  hoverable
                  style={{ width: '240px' }}
                  cover={<img style={{ height: 200, objectFit:'cover' }} alt="example" src={sd.media[0]?.file} />}
                  actions={[
                    <DeleteOutlined onClick={()=> deleteAd(sd._id)} key="setting" />,
                    <EditOutlined onClick={()=> history.push(`/add-ad?id=${sd._id}`)} key="edit" />,
                  ]}
                >
                  <div>
                    <div>{sd.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>${sd.price}</div>
                    <div style={{ fontSize: 12 }}>{sd.location} - {moment(sd.creationDate).fromNow()}</div>
                  </div>
                </Card>
              </Col>
            ))}
            </Row>}
        </div>
      </>
    </div>
  )
}

export default MyAds
