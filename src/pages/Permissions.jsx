import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Layout,
  Tooltip,
  message,
  Popconfirm,
  Form,
  Modal,
  DatePicker,
  TimePicker,
  Typography,
  Row,
  Col
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import PermissionService from "../api/PermissionService.ts";
import { useEffect } from "react";
import moment from "moment";
const { Text } = Typography;

const permissionService = new PermissionService();

const PermissionTable = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const getAllPermissions = async () => {
    try {
      const response = await permissionService.getAllPermissions();
      setPermissions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (record) => {
    const { permissionDate, permissionStartHour, permissionEndHour, ...rest } =
      record;

    const formattedRecord = {
      ...rest,
      permissionDate: moment(permissionDate).format("YYYY/MM/DD"),
      permissionStartHour: moment(permissionStartHour, "HH:mm"),
      permissionEndHour: moment(permissionEndHour, "HH:mm"),
    };

    //setFormData(formattedRecord);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await permissionService.updatePermission(
        formData.id,
        values
      );
      getAllPermissions();
      console.log(response);
      message.success("İzin güncellendi.");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setPermissionStatusAccepted = async (record) => {
    try {
      const response = await permissionService.setStatusAccepted(record);
      getAllPermissions();
      console.log(response);
      message.success("İzin onaylandı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setPermissionStatusWaiting = async (record) => {
    try {
      const response = await permissionService.setStatusWaiting(record);
      getAllPermissions();
      console.log(response);
      message.warning("İzin beklemeye alındı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setPermissionStatusDeclined = async (record) => {
    try {
      const response = await permissionService.setStatusDeclined(record);
      getAllPermissions();
      console.log(response);
      message.error("İzin reddedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  const formatFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

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
          String(record.permissionReason)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.status)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      filteredValue: [searchedText],
      render: (_, record) => (
        <b>{formatFullName(record.staff.firstName, record.staff.lastName)}</b>
      ),
    },
    {
      title: "İzin Tarihi",
      dataIndex: "permissionDate",
      key: "permissionDate",
      render: (text) => formatPermissionDate(text),
    },
    {
      title: "Saat Aralığı",
      key: "timeRange",
      render: (text, record) => (
        <>
          {formatPermissionHour(record.permissionStartHour) +
            "-" +
            formatPermissionHour(record.permissionEndHour)}
        </>
      ),
    },
    {
      title: "Gerekçe",
      dataIndex: "permissionReason",
      key: "permissionReason",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return <p>{record.status}</p>;
      },
      filters: [
        { text: "WAITING", value: "WAITING" },
        { text: "ACCEPTED", value: "ACCEPTED" },
        { text: "DECLINED", value: "DECLINED" },
        { text: "CANCELLED", value: "CANCELLED" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Tooltip title="Düzenle">
            <Button
              id="editButton"
              type="primary"
              onClick={() => showModal(record)}
              icon={<EditOutlined />}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Onayla">
            <Popconfirm
              title="Onaylamak istediğinize emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              onConfirm={() => setPermissionStatusAccepted(record)}
            >
              <Button
                type="success"
                icon={<CheckOutlined />}
                style={{
                  marginRight: 8,
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Reddet">
            <Popconfirm
              title="Reddetmek istediğinize emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              onConfirm={() => setPermissionStatusDeclined(record)}
            >
              <Button
                type="danger"
                icon={<CloseOutlined />}
                style={{
                  marginRight: 8,
                  backgroundColor: "firebrick",
                  color: "white",
                }}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Beklemeye Al">
            <Popconfirm
              title="Beklemeye almak istediğinize emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              onConfirm={() => setPermissionStatusWaiting(record)}
            >
              <Button
                type="default"
                icon={<ClockCircleOutlined />}
                style={{
                  marginRight: 8,
                  backgroundColor: "orange",
                  color: "white",
                }}
              />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const formatPermissionDate = (dateString) => {
    const formattedDate = moment(dateString, "YYYYMMDDHHmmssSSS")
      .locale("tr")
      .format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  const formatPermissionHour = (hourString) => {
    const formattedHour = moment(hourString, "HHmm").format("HH:mm");
    return formattedHour;
  };

  useEffect(() => {
    getAllPermissions();
  }, []);

  return (
    <Layout style={{ padding: '24px' }}>
      <Row justify="start" align="middle">
      <Col>
        <Text strong style={{ fontSize: '30px' }}>İzin Talepleri</Text>
      </Col>
      <Col style={{marginLeft: '15px'}}>
        <Button type="primary" style={{backgroundColor: 'green'}}>
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
        <Table columns={columns} dataSource={permissions} />
      </Content>
      <Modal
        title="İzin Güncelle"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} initialValues={formData}>
          <Form.Item name="permissionDate" label="İzin Tarihi">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item name="permissionStartHour" label="Başlangıç Saati">
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="permissionEndHour" label="Bitiş Saati">
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="permissionReason" label="Gerekçe">
            <Input />
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

export default PermissionTable;
