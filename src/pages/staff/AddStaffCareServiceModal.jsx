import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import CareServiceService from "../../api/CareServiceService.ts";

const careServiceService = new CareServiceService();

const AddStaffCareServiceModal = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
  staffCareServices,
}) => {
  const [form] = Form.useForm();

  // Modal görünürlük durumu ve form başlangıç değerleri
  const [modalVisible, setModalVisible] = useState(visible);
  const [careServices, setCareServices] = useState(null);
  const [filteredCareServices, setFilteredCareServices] = useState(null);

  const getAllCareServices = async () => {
    try {
      const response = await careServiceService.getAllCareServices();
      setCareServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Modal kapatma işlemi
  const handleCancel = () => {
    setModalVisible(false);
    onCancel();
  };

  // Modal güncelleme işlemi
  const handleAdd = () => {
    form.validateFields().then((values) => {
      onUpdate(values);
      setModalVisible(false);
    });
  };

  useEffect(() => {
    getAllCareServices();
  }, []);

  useEffect(() => {
    filterCareServices();
  }, [careServices]);

  // Modal görünürlük durumu değiştiğinde formun başlangıç değerlerini güncelle
  useEffect(() => {
    setModalVisible(visible);
    form.setFieldsValue(initialValues);
  }, [visible, initialValues, form]);

  const filterCareServices = () => {
    if (careServices && staffCareServices) {
      const staffCareServiceIds = staffCareServices.map(
        (item) => item.careService.careServiceId
      );

      const filteredCareServices = careServices.filter(
        (service) => !staffCareServiceIds.includes(service.careServiceId)
      );

      setFilteredCareServices(filteredCareServices);
    }
  };

  return (
    <Modal
      title="Yeni Ekle"
      open={modalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="update" type="primary" onClick={handleAdd}>
          Ekle
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Hizmet Seç"
          name="careServiceId"
          rules={[{ required: true, message: "Lütfen servis seçin!" }]}
        >
          <Select>
            {careServices && filteredCareServices ? (
              filteredCareServices.map((careService) => (
                <Select.Option
                  key={careService.careServiceId}
                  value={careService.careServiceId}
                >
                  {careService.careServiceName}
                </Select.Option>
              ))
            ) : (
              <></>
            )}
          </Select>
        </Form.Item>
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
            <Select.Option key={4} value={90}>
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

export default AddStaffCareServiceModal;
