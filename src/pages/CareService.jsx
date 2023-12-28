import { Button, Col, Row } from 'antd'
import React from 'react'
import CareServiceList from '../components/careService/CareServiceList'

function CareService() {
  return (
    <div style={{ padding: '24px' }}>
    <Row justify="start" align="middle">
      <Col>
        <h1>Bakım Servisleri</h1>
      </Col>
      <Col style={{marginLeft: '15px'}}>
        <Button type="primary" style={{backgroundColor: 'green'}} onClick={() => null}>
          Yeni Ekle
        </Button>
      </Col>
    </Row>
    <CareServiceList />
  </div>
  )
}

export default CareService