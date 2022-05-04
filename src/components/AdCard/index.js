import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.scss'

const AdCard = ({ title, price, image, address, date, id }) => {
  const history  = useHistory()
  return (
    <div>
        <div class="blog-card">
          <div class="meta">
            <div class="photo" style={{ backgroundImage : `url(${image})`}}></div>
            <ul class="details">
              <li class="date">{date}</li>
            </ul>
          </div>
          <div class="description">
            <h1>{title}</h1>
            <h2>USD {price}</h2>
            <p>{address}</p>
            <p class="read-more">
              <a onClick={()=> history.push(`/ad-detail?id=${id}`)}>See Detail</a>
            </p>
          </div>
      </div>
    </div>
  )
}

export default AdCard