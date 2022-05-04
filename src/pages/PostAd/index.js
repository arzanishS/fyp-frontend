import React, { useState, useEffect } from 'react'
import { Modal, Form, Row, Col, Input, Divider, Upload, Button, Select, Radio, Spin } from 'antd'
import { beforeUpload, openNotification, useQueryParams } from '../../helpers'
import axios from 'axios'
import { useHistory } from 'react-router'
import { GoogleApiWrapper } from 'google-maps-react'
import { general_cat, sub1_cat, sub2_cat, brand_name } from '../../constants'

const { TextArea } = Input
const { Option } = Select

const PostAd = () => {
  const history = useHistory()
  const [selectedFile, setSelectedFile] = useState([])
  const [loading, setLoading] = useState(false)
  const query = useQueryParams()
  const [initialData, setInitialData] = useState()
  const isEdit = query.get('id')
  const [brandName, setBrandName] = useState('')
  const [shippingVal, setShippingVal] = useState(undefined)
  const [genCat, setGenCat] = useState('')
  const [subCat1, setSubCat1] = useState('')
  const [subCat2, setSubCat2] = useState('')
  const [itemCondition, setItemCondition] = useState(undefined)
  const fetchData = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/ads/getAdsById?id=${query.get('id')}`
    }).catch(error => {
      console.log(error)
    }).then(response => {
      setInitialData(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (isEdit) {
      fetchData()
    }
  }, [])

  const dummyRequest = ({ _, onSuccess }) => {
    setTimeout(() => { onSuccess('ok') }, 0)
  }

  const fileSelected = ({ file, fileList: newFileList }) => {
    if (beforeUpload(file)) {
      setSelectedFile(newFileList)
    } else {
      return
    }
  }

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
  const getPrediction = async (e) => {
    e.preventDefault()
    const adData = {
      shipping: shippingVal,
      item_condition: itemCondition,
      brand_name: brandName,
      gen_cat: genCat,
      sub1_cat: subCat1,
      sub2_cat: subCat2
    }
    console.log(adData)
    if (itemCondition !== undefined && brandName !== '' && shippingVal !== undefined && genCat !== '' && subCat1 !== '' && subCat2 !== '') {
      setLoading(true)
      const res = await axios.post('https://api-ywnvzro66q-ew.a.run.app/price', adData)
      if (res) {
        setLoading(false)
        console.log(res.data?.price.toFixed(2))
        info(res.data?.price.toFixed(2))
        setShippingVal(undefined)
      }
    } else {
      openNotification('Please fill Required Values to Predeict !')
    }
    setLoading(false)
  }

  const onSubmit = async (e) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('userAuth'))
    const formData = new FormData()
    formData.append('name', e.name)
    formData.append('item_description', e.item_description)
    formData.append('location', e.location)
    formData.append('status', 'in_ads')
    formData.append('item_condition_id', e.item_condition_id)
    formData.append('general_cat', e.general_cat)
    formData.append('sub1_cat', e.sub1_cat)
    formData.append('sub2_cat', e.sub2_cat)
    formData.append('brand_name', e.brand_name)
    formData.append('price', e.price)
    formData.append('shipping', e.shipping)
    formData.append('createdBy', user._id)
    if (selectedFile) {
      selectedFile.forEach(file => {
        formData.append('media', file.originFileObj)
      })
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/api/ads/addAds`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      validateStatus: (status) => {
        return true
      }
    }).catch(error => {
      setLoading(false)
      console.log(error)
    }).then(response => {
      console.log(response)
      setLoading(false)
      if (response?.data?.status === 'success') {
        openNotification('Successfully Posted')
        history.push('/')
      }
    }
    )
  }

  const onEdit = (e) => {
    setLoading(true)
    const data = e
    e._id = isEdit
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/api/ads/updateAds`,
      data: data,
      validateStatus: (status) => {
        return true
      }
    }).catch(error => {
      setLoading(false)
      console.log(error)
    }).then(response => {
      setLoading(false)
      if (response?.data?.status === true) {
        openNotification('Successfully updated')
        history.push('/')
      }
    }
    )
  }

  return (
    loading ? <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Spin spinning size='large' /></div>
      : <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 20 }}>{isEdit ? 'Post an Ad' : 'Update an Ad'}</h1>
        <Form layout='vertical' initialValues={initialData} onFinish={(e) => isEdit ? onEdit(e) : onSubmit(e)}>
          <Row gutter={16}>
            <Col span={11}>
              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input name!' }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label='Description' name='item_description' rules={[{ required: true, message: 'Please input description!' }]}>
                <TextArea />
              </Form.Item>

              <Form.Item label='Location' name='location' rules={[{ required: true, message: 'Please input location!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label='General Category' name='general_cat' rules={[{ required: true, message: 'Please input general category!' }]}>
                <Select
                  onChange={(e) => { setGenCat(e) }}
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >
                  {general_cat.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label='Sub Category 1' name='sub1_cat' rules={[{ required: true, message: 'Please input sub category 1!' }]}>
                <Select
                  onChange={(e) => { setSubCat1(e) }}
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >
                  {sub1_cat.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label='Sub Category 2' name='sub2_cat' rules={[{ required: true, message: 'Please input sub category 2!' }]}>
                <Select
                  onChange={(e) => { setSubCat2(e) }}
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >
                  {sub2_cat.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Divider type='vertical' style={{ height: '100%' }} />
            </Col>

            <Col span={11}>

              <Form.Item label='Brand' name='brand_name' rules={[{ required: true, message: 'Please input brand!' }]}>
                <Select
                  onChange={(e) => { setBrandName(e) }}
                  showSearch
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                >
                  {brand_name.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label='Price' type='number' name='price' rules={[{ required: true, message: 'Please input price!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label='Item Condition' name='item_condition_id' rules={[{ required: true, message: 'Please input condition!' }]}>
                <Select onChange={(e) => { setItemCondition(e) }}>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Shipping' name='shipping' rules={[{ required: true, message: 'Please input condition!' }]}>
                <Radio.Group onChange={(e) => { setShippingVal(e.target?.value) }}>
                  <Radio value={0}>Yes</Radio>
                  <Radio value={1}>No</Radio>
                </Radio.Group>
              </Form.Item>

              {!isEdit && <Form.Item label='Media' name='media'>
                <Upload
                  customRequest={dummyRequest}
                  listType='picture-card'
                  fileList={selectedFile}
                  onChange={fileSelected}
                >
                  + Upload
                </Upload>
                <p className='ant-upload-hint'>
                  you can attach Image
                </p>
                <p style={{ margin: 0 }}>Attachment Size Limit</p>
                <p style={{ color: 'red', fontSize: 12, margin: 0 }}>- Image 3MB</p>
                </Form.Item>}

            </Col>
          </Row>
          <Button htmlType='submit' type='primary' style={{ borderRadius: 20, color: 'white', width: 200, float: 'right', margin: 10 }}>Post Ad</Button>
          <Button onClick={(e) => { getPrediction(e) }} type='primary' style={{ borderRadius: 20, color: 'white', width: 200, float: 'left', margin: 10 }}>Predict Price</Button>
        </Form>
      </div>
  )
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyAnzC94XYyMLBIv26zfR1hq9pgJb1wNavw' })(PostAd)
