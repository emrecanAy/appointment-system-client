import { Button, DatePicker, Form, Input, Modal, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StaffConfigService from "../../api/StaffConfigService.ts";

const hours = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00",
];

const staffConfigService = new StaffConfigService();
function AddPermissionModal({
  addModalVisible,
  onAddModalCancel,
  onAddModalUpdate,
  handleAdd
}) {
  const [selectedStartHour, setSelectedStartHour] = useState(null);
  const [filteredEndHours, setFilteredEndHours] = useState(hours);
  const [isWholeDaySelected, setIsWholeDaySelected] = useState(false);
  const [staffConfig, setStaffConfig] = useState(null);
  const [form] = Form.useForm();

  const { staffId } = useParams();

  /* REQUESTS */
  const getStaffConfigByStaff = async (staffId) => {
    try {
      const response = await staffConfigService.getStaffConfigByStaffId(
        staffId
      );
      setStaffConfig(response.data);
    } catch (error) {
        console.log(error)
    }
  };

  /* FILTERS */
  const filterEndShiftHours = () => {
    if (selectedStartHour) {
      const _selectedStartHour = new Date(
        null,
        null,
        null,
        selectedStartHour.split(":")[0],
        selectedStartHour.split(":")[1],
        0
      );
      const result = hours.filter((hour) => {
        var newHour = new Date(
          null,
          null,
          null,
          hour.split(":")[0],
          hour.split(":")[1],
          0
        );
        if (_selectedStartHour < newHour) {
          return newHour;
        }
      });
      setFilteredEndHours(result);
    }
  };


  /* HANDLINGS */
  const handleCancel = () => {
    onAddModalCancel();
  };

  const handleAddPermission = () => {
    form.validateFields().then((values) => {
        values.staffId = staffId;
      if (isWholeDaySelected && staffConfig) {
        values.permissionStartHour = formatHour(staffConfig.startShiftHour);
        values.permissionEndHour = formatHour(staffConfig.endShiftHour);
      }
      delete values.allDay;
      console.log(values);
      handleAdd(values);
    });
  };

  const formatHour = (input) => {
    if (Array.isArray(input) && input.length === 2) {
      let hour = String(input[0]).padStart(2, '0');
      let minute = String(input[1]).padStart(2, '0');
      
      return `${hour}:${minute}`;
    } else {
      return "Geçersiz giriş formatı.";
    }
  };

  useEffect(() => {
    getStaffConfigByStaff(staffId);
  }, [staffId]);
 

  useEffect(() => {
    filterEndShiftHours();
  }, [selectedStartHour]);

  return (
    <Modal
      title="Yeni Ekle"
      open={addModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="update" type="primary" onClick={handleAddPermission}>
          Ekle
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tarih"
          name="permissionDate"
          rules={[{ required: true, message: "Lütfen tarih seçin!" }]}
        >
          <DatePicker placeholder="Tarih seçin" />
        </Form.Item>
        <Form.Item
          label="Başlangıç Saati"
          name="permissionStartHour"
          rules={[
            { required: !isWholeDaySelected, message: "Lütfen izin başlangıç saatini seçin!" },
          ]}
        >
          <Select
            disabled={isWholeDaySelected}
            onChange={(value) => setSelectedStartHour(value)}
          >
            {hours.map((hour, i) => (
              <Select.Option key={i} value={hour}>
                {hour}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Bitiş Saati"
          name="permissionEndHour"
          rules={[
            { required: !isWholeDaySelected, message: "Lütfen izin bitiş saatini seçin!" },
          ]}
        >
          <Select disabled={!selectedStartHour || isWholeDaySelected}>
            {filteredEndHours.map((hour, i) => (
              <Select.Option key={i} value={hour}>
                {hour}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tüm Gün" name="allDay">
          <Switch defaultValue={false} onChange={(value) => setIsWholeDaySelected(value)} />
        </Form.Item>
        <Form.Item
          label="Gerekçe"
          name="permissionReason"
          rules={[{ required: true, message: "Lütfen izin sebebini girin!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddPermissionModal;
