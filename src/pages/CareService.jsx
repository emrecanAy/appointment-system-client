import { Button, Col, Input, Modal, Row, Typography, message } from 'antd'
import React, { useState } from 'react'
import CareServiceList from '../components/careService/CareServiceList'
import CareServiceService from '../api/CareServiceService.ts';

const { Text } = Typography;

function CareService() {

  //Services
  const careServiceService = new CareServiceService();

  //States
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCareService, setEditedCareService] = useState({ careServiceId: null, careServiceName: '', careServiceDescription: '', imagePath: '' });

  const handleEditClick = (careServiceId, careServiceName, careServiceDescription, imagePath) => {
    setEditedCareService({ careServiceId, careServiceName, careServiceDescription, imagePath });
    setEditModalVisible(true);
  };

  const handleAddNew = () => {
    setEditedCareService({ careServiceId: null, careServiceName: '', careServiceDescription: '', imagePath: '' });
    setEditModalVisible(true);
  };

  const handleSubmit = async() => {
    if(editedCareService.careServiceId === null){
      const response = await careServiceService.createCareService(editedCareService); 
      message.success(`${editedCareService.careServiceName} eklendi!`);
      console.log("1071 ADD: ", response);
    }else{
      const response = await careServiceService.updateCareService(editedCareService);
      message.success(`${editedCareService.careServiceName} güncellendi!`);
      console.log("1071 UPDATE: ", response);
      
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
        key={editedCareService.careServiceId}
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
          value={editedCareService.imagePath}
          onChange={(e) => setEditedCareService({ ...editedCareService, imagePath: e.target.value })}
        />
        <Input
          style={{marginBottom: 5}}
          placeholder="Bakım Servisi"
          value={editedCareService.careServiceName}
          onChange={(e) => setEditedCareService({ ...editedCareService, careServiceName: e.target.value })}
        />
        <Input.TextArea
          placeholder="Açıklama"
          value={editedCareService.careServiceDescription}
          onChange={(e) => setEditedCareService({ ...editedCareService, careServiceDescription: e.target.value })}
        />
      </Modal>
  </div>
  )
}

export default CareService