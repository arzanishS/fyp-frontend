import React from 'react'
import { Card, Button } from 'antd'

const casesCard = ({data, i, loading, history}) => {

  return (
    <Card key={i} loading={loading} className='shadow-card' style={{ marginBottom:20}}>
      <div style={{marginTop: 5, display: 'flex', justifyContent:'space-between'}}>
        <p>{data.childName && data.childName.toString()}</p>
        <p >Age: {data.age} Yrs</p>
        <p >Evidences: 5</p>
        <p >Date: {data.creationDate.substring(0,10)}</p>
        <p>Register By: {data.registerName}</p>
        <p>Relation: {data.relation}</p>
      </div>
      <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display: 'flex', alignItems:'center'}}>
          <p style={{marginLeft:3}}>Location: {data.location}</p>
        </div>
        <Button onClick={()=> history.push(`./casedetail?id=${data._id}`)} style={{backgroundColor: '#722135', borderRadius:20, color:'white'}} >View Details</Button>
      </div>
    </Card>
  )
}

export default casesCard
