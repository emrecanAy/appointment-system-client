import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Layout,
  TimePicker,
  message,
  Row,
  Col,
  Typography,
} from "antd";
import StaffConfigService from "../api/StaffConfigService.ts";
import moment from "moment";
import { Content } from "antd/es/layout/layout";
const { Text } = Typography;

//Services
const staffConfigService = new StaffConfigService();

const StaffConfigs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [staffConfigs, setStaffConfigs] = useState(null);

  const columns = [
    {
      title: "Ad Soyad",
      key: "staffFullName",
      onFilter: (value, record) => {
        return (
          String(record.staff.firstName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.staff.lastName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.breakTime)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.startShiftHour)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.endShiftHour)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.breakHour).toLowerCase().includes(value.toLowerCase())
        );
      },
      filteredValue: [searchedText],
      render: (text, record) => (
        <b>{formatFullName(record.staff.firstName, record.staff.lastName)}</b>
      ),
    },
    {
      title: "Mesai Başlangıç Saati",
      dataIndex: "startShiftHour",
      key: "startShiftHour",
      render: (text, record) => <>{formatHour(record.startShiftHour)}</>,
    },
    {
      title: "Mesai Bitiş Saati",
      dataIndex: "endShiftHour",
      key: "endShiftHour",
      render: (text, record) => <>{formatHour(record.endShiftHour)}</>,
    },
    {
      title: "Mola Saati",
      dataIndex: "breakHour",
      key: "breakHour",
      render: (text, record) => <>{formatHour(record.breakHour)}</>,
    },
    {
      title: "Mola Süresi(dk)",
      dataIndex: "breakTime",
      key: "breakTime",
    },
    {
      title: "İşlem Aralığı(dk)",
      dataIndex: "slotSpacing",
      key: "slotSpacing",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            style={{ backgroundColor: "orange" }}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Silmek istediğinize emin misiniz?"
            okText={"Evet"}
            cancelText={"İptal"}
            onConfirm={() => handleDelete(record)}
          >
            <Button
              type="danger"
              style={{
                marginLeft: 8,
                backgroundColor: "firebrick",
                color: "white",
              }}
            >
              Sil
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const getAllStaffConfigs = async () => {
    const response = await staffConfigService.getAllStaffConfigs();
    getAllStaffConfigs();
    setStaffConfigs(response.data);
  };

  useEffect(() => {
    getAllStaffConfigs();
  }, []);

  const formatHour = (hourString) => {
    const formattedHour = moment(hourString, "HHmm").format("HH:mm");
    return formattedHour;
  };

  const formatFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    await staffConfigService.deleteStaffConfig(record);
    message.success("Silindi!");
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!staffConfigs) {
    return <>Loading...</>;
  }

  return (
    <Layout style={{ padding: '24px' }}>
      <Row justify="start" align="middle">
      <Col>
        <Text strong style={{ fontSize: '30px' }}>Personel Ayarları</Text>
      </Col>
      <Col style={{marginLeft: '15px'}}>
        <Button type="primary" style={{backgroundColor: 'green'}} >
          Yeni Ekle
        </Button>
      </Col>
    </Row>
      <Content
        style={{
          padding: "24px",
          display: "initial",
          justifyContent: "center",
        }}
      >
        <Input.Search
          placeholder="Arama yap..."
          style={{ marginBottom: 8 }}
          onSearch={(value) => setSearchedText(value)}
          onChange={(e) => setSearchedText(e.target.value)}
        />

        <Table dataSource={staffConfigs} columns={columns} />
      </Content>
      <Modal
        title="Edit Record"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form>
          <Form.Item label="Ad Soyad" name="staffFullName">
            <Input />
          </Form.Item>
          <Form.Item label="Mesai Başlangıç Saati" name="startShiftHour">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Mesai Bitiş Saati" name="endShiftHour">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Mola Saati" name="breakHour">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Mola Süresi(dk)" name="breakTime">
            <InputNumber />
          </Form.Item>
          <Form.Item label="İşlem Aralığı(dk)" name="slotSpacing">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default StaffConfigs;
