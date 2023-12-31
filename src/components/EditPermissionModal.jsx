import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";

const EditPermissionModal = ({
  visible,
  onCancel,
  onUpdate,
  initialValues,
}) => {
  const [form] = Form.useForm();

  // Modal görünürlük durumu ve form başlangıç değerleri
  const [modalVisible, setModalVisible] = useState(visible);
  const [permission, setPermission] = useState(initialValues);

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

  const onDatePickerChange = (date, dateString) => {
    //moment.locale("tr");
  };

  // Modal görünürlük durumu değiştiğinde formun başlangıç değerlerini güncelle
  React.useEffect(() => {
    setModalVisible(visible);
    //inital values edit'e tıklayınca doğru geliyor. Ama daha edit'e tıklamadan
    //const rawDate = permission.permissionDate;
    //const formattedDate = dayjs(`${rawDate[0]}-${rawDate[1]}-${rawDate[2]} ${rawDate[3]}:${rawDate[4]}:${rawDate[5]}`).format('YYYY/MM/DD');
    //console.log("TEST", formattedDate);

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
          label="Tarih"
          name="permissionDate"
          rules={[{ required: true, message: "Lütfen tarih girin!" }]}
        >
          <DatePicker format={"YYYY/MM/DD"} onChange={onDatePickerChange} />
        </Form.Item>
        <Form.Item
          label="Başlangıç Saati"
          name="permissionStartHour"
          rules={[
            { required: true, message: "Lütfen başlangıç saatini girin!" },
          ]}
        >
          <TimePicker format={"HH:mm"} />
        </Form.Item>
        <Form.Item
          label="Bitiş Saati"
          name="permissionEndHour"
          rules={[{ required: true, message: "Lütfen bitiş saatini girin!" }]}
        >
          <TimePicker format={"HH:mm"} />
        </Form.Item>
        <Form.Item label="Sebep" name="permissionReason">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Durum" name="status">
          <Select>
            <Option value="0">Onaylandı</Option>
            <Option value="1">Bekliyor</Option>
            <Option value="2">Reddedildi</Option>
            <Option value="3">İptal</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPermissionModal;
