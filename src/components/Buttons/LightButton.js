import React from 'react'
import { Button } from 'antd'
import './styles.scss'

const LightButton = ({onClick, styles, type, label}) => {
  return (
    <div id='y-btn' style={styles}>
      <Button htmlType={type} onClick={onClick} style={{backgroundColor: '#FEBF43', borderRadius: 5, width: 150 }}>{label}</Button>
    </div>
  )
}

export default LightButton
