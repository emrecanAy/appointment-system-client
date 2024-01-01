import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/skeleton/Title";
import StaffConfigService from "../api/StaffConfigService.ts";
import moment from "moment";

//Services
const staffConfigService = new StaffConfigService();

const TestStaffConfigs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
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
        <>{formatFullName(record.staff.firstName, record.staff.lastName)}</>
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
    console.log("LOG: ", response.data);
    setStaffConfigs(response.data);
  };

  useEffect(() => {
    getAllStaffConfigs();
  }, []);

  const formatFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  const formatHour = (hourString) => {
    const formattedHour = moment(hourString, "HHmm").format("HH:mm");
    return formattedHour;
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
  };

  if (!staffConfigs) {
    return <>Loading...</>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "16px 24px",
          textAlign: "left",
        }}
      >
        <Title level={2}>İzin İşlemleri</Title>
      </Header>
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
        <Form onFinish={onFinish} initialValues={currentRecord}>
          <Form.Item label="Staff Full Name" name="staffFullName">
            <Input defaultValue={currentRecord.staff.firstName} />
          </Form.Item>
          <Form.Item label="Start Shift Hour" name="startShiftHour">
            <Input />
          </Form.Item>
          <Form.Item label="End Shift Hour" name="endShiftHour">
            <Input />
          </Form.Item>
          <Form.Item label="Break Hour" name="breakHour">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Break Time" name="breakTime">
            <Input />
          </Form.Item>
          <Form.Item label="Slot Spacing" name="slotSpacing">
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

export default TestStaffConfigs;
