import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Layout,
  Tooltip,
  message,
  Popconfirm,
  Typography,
  Row,
  Col,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import moment from "moment";
import AppointmentService from "../../api/AppointmentService.ts";
import { useParams } from "react-router-dom";
const { Text } = Typography;

const appointmentService = new AppointmentService();

const StaffAppointmentOperationsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  const { staffId } = useParams();

  const getAllAppointmentsByStaff = async (staffId) => {
    try {
      const response = await appointmentService.getAllAppointmentsByStaff(
        staffId
      );
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusAccepted = async (record) => {
    try {
      await appointmentService.setAppointmentAccepted(record);
      getAllAppointmentsByStaff(staffId);
      message.success("Randevu onaylandı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusWaiting = async (record) => {
    try {
      await appointmentService.setAppointmentWaiting(record);
      getAllAppointmentsByStaff(staffId);
      message.warning("Randevu beklemeye alındı.");
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusDeclined = async (record) => {
    try {
      await appointmentService.setAppointmentDeclined(record);
      getAllAppointmentsByStaff(staffId);
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
  };

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
            .includes(value.toLowerCase())||
            String(record.appointmentDate)
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      },
      filteredValue: [searchedText],
      render: (_, record) => (
        <strong><i>
          {formatFullName(record.customer.firstName, record.customer.lastName)}
          </i>
        </strong>
      ),
    },
    {
      title: "Tarih",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      sorter: (a, b) =>
        formatAppointmentDateToSort(a.appointmentDate) -
        formatAppointmentDateToSort(b.appointmentDate),
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
    getAllAppointmentsByStaff(staffId);
  }, [staffId]);

  return (
    <Layout style={{ padding: "24px" }}>
      <Row justify="start" align="middle">
        <Col>
          <Text strong style={{ fontSize: "30px" }}>
            Randevular
          </Text>
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
    </Layout>
  );
};

export default StaffAppointmentOperationsPage;
