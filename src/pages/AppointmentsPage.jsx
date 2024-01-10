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
  Typography,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import moment from "moment";
import AppointmentService from "../api/AppointmentService.ts";
const { Text } = Typography;

const appointmentService = new AppointmentService();

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const getAllAppointments = async () => { 
    try {
      const response = await appointmentService.getAllAppointments();
      setAppointments(response.data);
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
      //UPDATE İŞLEMİ YAPCAM
      getAllAppointments();
      message.success("Randevu güncellendi.");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusAccepted = async (record) => {
    try {
      const response = await appointmentService.setAppointmentAccepted(record);
      getAllAppointments();
      console.log(response);
      message.success("Randevu onaylandı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusWaiting = async (record) => {
    try {
      const response = await appointmentService.setAppointmentWaiting(record);
      getAllAppointments();
      console.log(response);
      message.warning("Randevu beklemeye alındı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusDeclined = async (record) => {
    try {
      const response = await appointmentService.setAppointmentDeclined(record);
      getAllAppointments();
      console.log(response);
      message.error("Randevu reddedildi!");
    } catch (error) {
      console.log(error);
    }
  };

  const formatFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  const formatServices = (value) => {
    const serviceNames = [];
    value.staffCareServices.forEach((item) => {
      serviceNames.push(item.careService.careServiceName);
    });
    const formattedText = serviceNames.join("-");
    return formattedText;
  };

  const formatDuration = (value) => {
    let totalDuration = 0;
    value.staffCareServices.forEach((item) => {
        totalDuration += item.careServiceDuration;
      });
    return totalDuration;
  }

  const columns = [
    {
      title: "Müşteri",
      key: "customerFullName",
      onFilter: (value, record) => {
        return (
          String(record.customer.firstName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer.lastName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      filteredValue: [searchedText],
      render: (_, record) => (
        <b>
          {formatFullName(record.customer.firstName, record.customer.lastName)}
        </b>
      ),
    },
    {
      title: "Personel",
      key: "staffFullName",
      render: (_, record) => (
        <b><i>{formatFullName(record.staff.firstName, record.staff.lastName)}</i></b>
      ),
    },
    {
      title: "Tarih",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      sorter: (a, b) => formatAppointmentDateToSort(a.appointmentDate) - formatAppointmentDateToSort(b.appointmentDate),
      render: (text) => formatAppointmentDate(text),
    },
    {
      title: "Hizmetler",
      key: "services",
      render: (value) => formatServices(value),
    },
    {
      title: "Toplam Süre",
      key: "totalDuration",
      render: (value) => formatDuration(value),
    },
    {
      title: "Not",
      dataIndex: "note",
      key: "note",
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
              onConfirm={() => setAppointmentStatusAccepted(record)}
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
              onConfirm={() => setAppointmentStatusDeclined(record)}
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
              onConfirm={() => setAppointmentStatusWaiting(record)}
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

  const formatAppointmentDate = (dateString) => {
    const formattedDate = moment(dateString, "YYYYMMDDHHmmssSSS")
      .locale("tr")
      .format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  const formatAppointmentDateToSort = (dateString) => {
    const formattedDate = moment(dateString, "YYYYMMDDHH")
      .locale("tr")
      .format("YYYY-MM-DD");
    return formattedDate;
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <Layout style={{ padding: '24px' }}>
      <Row justify="start" align="middle">
        <Col>
          <Text strong style={{ fontSize: "30px" }}>
            Randevular
          </Text>
        </Col>
        <Col style={{ marginLeft: "15px" }}>
          <Button type="primary" style={{ backgroundColor: "green" }}>
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
        <Table columns={columns} dataSource={appointments} />
      </Content>
      <Modal
        title="Randevu Düzenle"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} initialValues={formData}>
          <Form.Item name="appointmentDate" label="İzin Tarihi">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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

export default AppointmentsPage;
