import { Button, Col, Input, Modal, Row, Typography } from 'antd'
import React, { useState } from 'react'
import CareServiceList from '../components/careService/CareServiceList'
const { Text } = Typography;

function CareService() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCareService, setEditedCareService] = useState({ id: null, title: '', description: '', image: '' });

  const handleEditClick = (id, title, description, image) => {
    setEditedCareService({ id, title, description, image });
    setEditModalVisible(true);
  };

  const handleAddNew = () => {
    setEditedCareService({ id: null, title: '', description: '', image: '' });
    setEditModalVisible(true);
  };

  const handleSubmit = () => {
    if(editedCareService.id === null){
      console.log("Add operation!");
    }else{
      console.log("Update operation!");
    }
    setEditModalVisible(false);
  };

  const handleModalCancel = () => {
    setEditModalVisible(false);
  };
  return (
    <div style={{ padding: '24px' }}>
    <Row justify="start" align="middle">
      <Col>
        <Text strong style={{ fontSize: '30px' }}>Bakım Servisleri</Text>
      </Col>
      <Col style={{marginLeft: '15px'}}>
        <Button type="primary" style={{backgroundColor: 'green'}} onClick={handleAddNew}>
          Yeni Ekle
        </Button>
      </Col>
    </Row>
    <CareServiceList onEditClick={handleEditClick}/>
    <Modal
        title="Bakım Servisi"
        open={editModalVisible}
        footer={[
          <Button onClick={handleModalCancel}>
            İptal
          </Button>,
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            Gönder
          </Button>,
        ]}
      >
        <Input
          style={{marginBottom: 5}}
          placeholder="Görsel URL"
          value={editedCareService.image}
          onChange={(e) => setEditedCareService({ ...editedCareService, image: e.target.value })}
        />
        <Input
          style={{marginBottom: 5}}
          placeholder="Bakım Servisi"
          value={editedCareService.title}
          onChange={(e) => setEditedCareService({ ...editedCareService, title: e.target.value })}
        />
        <Input.TextArea
          placeholder="Açıklama"
          value={editedCareService.description}
          onChange={(e) => setEditedCareService({ ...editedCareService, description: e.target.value })}
        />
      </Modal>
  </div>
  )
}

export default CareService