import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Empty, Skeleton, Row, Pagination } from 'antd'
import './styles.scss'
import moment from 'moment'
import AdCard from '../../components/AdCard'
import { useParams } from 'react-router-dom'
import dotenv from 'dotenv'
dotenv.config()

const { Meta } = Card

const Ads = () => {
  const itemsPerPage = 5
  const [page, setPage] = useState(1)

  const [adsData, setAdsData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [loading, setloading] = useState(true)

  const { query, cat } = useParams()

  const renderNext = (page) => {
    console.log(page)
    setPage(page)
    const data = searchData.slice(((page - 1) * itemsPerPage), (page * itemsPerPage))
    setAdsData(data)
  }

  const fetchData = () => {
    setloading(true)
    axios({
      method: 'get',
      url: query ? `${process.env.REACT_APP_BACKEND}/api/ads/getAllAds?search=${query}` : cat ? `${process.env.REACT_APP_BACKEND}/api/ads/getAllAds?cat=${cat}` : `${process.env.REACT_APP_BACKEND}/api/ads/getAllAds`
    }).catch(error => {
      console.log(error)
    }).then(response => {
      setSearchData(response?.data || [])
      setAdsData(response?.data.slice(0, itemsPerPage) || [])
      console.log(response?.data)
      setloading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [query, cat])

  return (

    <div id='cases' style={{ padding: 20 }}>
      <>
        <div>
          {loading ? <Skeleton active /> : adsData && adsData.length < 1
            ? <Empty />
            : <Row gutter={[0, 20]}>
              {adsData.map((sd, i) => (
                <AdCard
                  key={i}
                  id={sd._id}
                  title={sd.name}
                  image={sd?.media && sd?.media.length && sd?.media[0].file}
                  price={sd.price}
                  address={sd.location}
                  date={moment(sd.creationDate).fromNow()}
                />
              ))}
            </Row>}
          <Pagination current={page} onChange={renderNext} pageSize={itemsPerPage} total={searchData.length} />
        </div>
      </>
    </div>
  )
}

export default Ads
