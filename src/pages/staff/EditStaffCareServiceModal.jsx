import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const EditStaffCareServiceModal = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}) => {
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
  useEffect(() => {
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
        <Form.Item
          label="Hizmet Fiyatı"
          name="careServicePrice"
          rules={[{ required: true, message: "Lütfen fiyatı girin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hizmet Süresi"
          name="careServiceDuration"
          rules={[{ required: true, message: "Lütfen servis seçin!" }]}
        >
          <Select>
            <Select.Option key={1} value={30}>
              30 Dakika
            </Select.Option>
            <Select.Option key={2} value={60}>
              1 Saat
            </Select.Option>
            <Select.Option key={3} value={90}>
              1.5 Saat
            </Select.Option>
            <Select.Option key={4} value={120}>
              2 Saat
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Not" name="note">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditStaffCareServiceModal;
