import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const EditStaffCareServiceModal = ({ visible, onCancel, onUpdate, initialValues }) => {
  const [form] = Form.useForm();

  // Modal görünürlük durumu ve form başlangıç değerleri
  const [modalVisible, setModalVisible] = useState(visible);

  // Modal kapatma işlemi
  const handleCancel = () => {
    setModalVisible(false);
    onCancel();
  };

  // Modal güncelleme işlemi
  const handleUpdate = () => {
    form.validateFields().then((values) => {
      onUpdate(values);
      setModalVisible(false);
    });
  };

  // Modal görünürlük durumu değiştiğinde formun başlangıç değerlerini güncelle
  React.useEffect(() => {
    setModalVisible(visible);
    form.setFieldsValue(initialValues);
  }, [visible, initialValues, form]);

  return (
    <Modal
      title="Düzenle"
      open={modalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Güncelle
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Hizmet Fiyatı" name="careServicePrice" rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Hizmet Süresi" name="careServiceDuration" rules={[{ required: true, message: "Lütfen süreyi girin!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Not" name="note">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditStaffCareServiceModal;
