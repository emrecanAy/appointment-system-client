import { Button, Form, Popconfirm, Select, message } from "antd";
import React, { useEffect, useState } from "react";

function StaffForm({ staffService, staff, staffConfig }) {
  const [selectedStartShiftHour, setSelectedStartShiftHour] = useState(null);
  const [selectedEndShiftHour, setSelectedEndShiftHour] = useState(null);
  const [filteredEndShiftHours, setFilteredEndShiftHours] = useState(null);
  const [filteredBreakHours, setFilteredBreakHours] = useState(null);

  const [form] = Form.useForm();

  const handleCancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const onFinish = async (values) => {
    const staffId = staff.staffId;
    const staffConfigId = staffConfig.staffConfigId;
    values.staffConfigId = staffConfigId;
    values.staffId = staffId;

    try {
      console.log(values);
      message.success(`Mesai ayarları güncellendi!`);
    } catch (error) {
      console.log(error);
    }
  };

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

  /* FILTERS */
  const filterEndShiftHours = () => {
    if (selectedStartShiftHour) {
      const _selectedStartShiftHour = new Date(
        null,
        null,
        null,
        selectedStartShiftHour.split(":")[0],
        selectedStartShiftHour.split(":")[1],
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
        if (_selectedStartShiftHour < newHour) {
          return newHour;
        }
      });
      setFilteredEndShiftHours(result);
    }
  };

  const filterBreakHours = () => {
    if (selectedStartShiftHour && selectedEndShiftHour) {
      const _selectedStartShiftHour = new Date(
        null,
        null,
        null,
        selectedStartShiftHour.split(":")[0],
        selectedStartShiftHour.split(":")[1],
        0
      );

      const _selectedEndShiftHour = new Date(
        null,
        null,
        null,
        selectedEndShiftHour.split(":")[0],
        selectedEndShiftHour.split(":")[1],
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
        if (
          _selectedStartShiftHour < newHour &&
          _selectedEndShiftHour > newHour
        ) {
          return newHour;
        }
      });
      setFilteredBreakHours(result);
    }
  };

  useEffect(() => {
    filterEndShiftHours();
  }, [selectedStartShiftHour]);

  useEffect(() => {
    filterBreakHours();
  }, [selectedEndShiftHour]);

  return (
    <div>
      {staffConfig ? (
        <Form
          name="staffConfigForm"
          initialValues={staffConfig}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
        >
          <Form.Item
            label="Mesai Başlangıç Saati"
            name="startShiftHour"
            rules={[
              {
                required: true,
                message: "Lütfen mesai başlangıç saatini seçin!",
              },
            ]}
          >
            <Select
              onChange={(value) => {
                setSelectedStartShiftHour(value);
              }}
            >
              {hours.map((hour, i) => (
                <Select.Option key={i} value={hour}>
                  {hour}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mesai Bitiş Saati"
            name="endShiftHour"
            rules={[
              { required: true, message: "Lütfen mesai bitiş saatini seçin!" },
            ]}
          >
            <Select
              disabled={!selectedStartShiftHour}
              onChange={(value) => setSelectedEndShiftHour(value)}
            >
              {filteredEndShiftHours ? (
                filteredEndShiftHours.map((hour, i) => (
                  <Select.Option key={i} value={hour}>
                    {hour}
                  </Select.Option>
                ))
              ) : (
                <div></div>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mola Saati"
            name="breakHour"
            rules={[
              { required: true, message: "Lütfen randevu aralığını seçin!" },
            ]}
          >
            <Select disabled={!selectedEndShiftHour}>
              {filteredBreakHours ? (
                filteredBreakHours.map((hour, i) => (
                  <Select.Option key={i} value={hour}>
                    {hour}
                  </Select.Option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mola Süresi"
            name="breakTime"
            rules={[
              { required: true, message: "Lütfen randevu aralığını seçin!" },
            ]}
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
          <Form.Item
            label="Randevu Aralığı"
            name="slotSpacing"
            rules={[
              { required: true, message: "Lütfen randevu aralığını seçin!" },
            ]}
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

          {/* Submit Button */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Popconfirm
              title="Güncelle"
              description="Güncellemek istediğinize emin misiniz? İleriye yönelik alınmış randevuların çakışması söz konusu olabilir!"
              onCancel={handleCancel}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default StaffForm;
