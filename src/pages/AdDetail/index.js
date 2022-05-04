import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useQueryParams, openNotification } from '../../helpers'
import { Modal, Skeleton, Image, Divider, Row, Col, Carousel, Button } from 'antd'
import { useMediaQuery } from 'react-responsive'
import './styles.scss'
import moment from 'moment'
import dotenv from 'dotenv'
dotenv.config()

const AdDetail = () => {
  const [data, setAdData] = useState({})
  const [loading, setLoading] = useState(true)
  const query = useQueryParams()
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const info = (price) => {
    Modal.info({
      title: 'Recommeneded Price',
      content: (
        <div>
          <p>${price}</p>
        </div>
      ),
      onOk () {}
    })
  }

  async function predictPrice () {
    if (data) {
      const adData = {
        shipping: data?.shipping,
        item_condition: data?.item_condition_id,
        brand_name: data?.brand_name,
        gen_cat: data?.general_cat,
        sub1_cat: data?.sub1_cat,
        sub2_cat: data?.sub2_cat
      }
      if (adData.item_condition && adData.brand_name !== '' && adData.shipping !== undefined && adData.gen_cat !== '' && adData.sub1_cat !== '' && adData.sub2_cat !== '') {
        setLoading(true)
        const res = await axios.post('https://api-ywnvzro66q-ew.a.run.app/price', adData)
        if (res) {
          setLoading(false)
          console.log(res.data?.price.toFixed(2))
          info(res.data?.price.toFixed(2))
        }
      } else {
        openNotification('Please fill Required Values to Predeict !')
      }
      const res = await axios.post('https://api-ywnvzro66q-ew.a.run.app/price', adData)
      console.log(res)
    } else {
      openNotification('Sorry Something wen wrong x')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/ads/getAdsById?id=${query.get('id')}`
    }).catch(error => {
      console.log(error)
    }).then(response => {
      setAdData(response.data)
      setLoading(false)
    })
  }

  return (
    loading
      ? <Skeleton active />
      : <div id='case-detail' style={{ padding: isMobile ? 10 : 70 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <div>
              <Carousel autoplay>
                {
                data?.media && data?.media.length && data?.media.map((data, i) => (
                  <div key={i}>
                    <center><Image src={data.file} key={i} style={{ width: '100%', objectFit: 'cover', height: 300 }} /></center>
                  </div>
                ))
              }
              </Carousel>
            </div>
            <div className='grey-border' style={{ marginTop: 10, padding: 10, borderRadius: 5 }}>
              <h2>Details</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left', flexDirection: 'column' }}>
                <div>Brand: <b>{data?.brand_name}</b> </div>
                <div>Category: {data?.general_cat} / {data?.sub1_cat} / {data?.sub2_cat}</div>
              </div>
              <div>Condition: {data?.item_condition_id}</div>
              <Divider />
              <h2>Description:</h2>
              <div>
                {data?.item_description}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <div className='grey-border' style={{ marginTop: 10, padding: 10, borderRadius: 5 }}>
              <h1>{data?.name}</h1>
              <h2 style={{ marginBottom: 2 }}>USD {data?.price} </h2>
              <Button style={{ marginTop: 10, borderRadius: 5 }} type='primary' onClick={predictPrice}>Predict Price</Button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <div>{data?.location} </div>
                <div>{moment(data?.creationDate).fromNow()}</div>
              </div>
            </div>

            <div className='grey-border' style={{ marginTop: 10, padding: 10, borderRadius: 5 }}>
              <h2>Seller Description</h2>
              <h3>{data?.createdBy?.name}</h3>
              <div>Member since {moment(data?.createdBy?.date).format('MMM YYYY')}</div>
              <div>Phone: {data?.createdBy?.phone}</div>
              <div>Email: {data?.createdBy?.email}</div>
            </div>
          </Col>
        </Row>
      </div>
  )
}

export default AdDetail
