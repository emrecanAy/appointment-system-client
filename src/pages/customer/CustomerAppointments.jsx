import { Button, DatePicker, Input, Modal, Popconfirm, Table, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import AppointmentService from "../../api/AppointmentService.ts";
import moment from "moment";
import { Form } from "antd";
import {
    EditOutlined,
    CloseOutlined,
  } from "@ant-design/icons";

const appointmentService = new AppointmentService();

function CustomerAppointments({ customer }) {
  const [appointments, setAppointments] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const getAppointmentsByCustomer = async (customerId) => {
    try {
      const response = await appointmentService.getAllAppointmentsByCustomer(
        customerId
      );
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointmentsByCustomer(customer.customerId);
  }, [customer.customerId]);

  const formatDuration = (value) => {
    let totalDuration = 0;
    value.staffCareServices.forEach((item) => {
        totalDuration += item.careServiceDuration;
      });
    return totalDuration;
  }

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      //UPDATE İŞLEMİ YAPCAM
      getAppointmentsByCustomer(customer.customerId);
      message.success("Randevu güncellendi.");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const setAppointmentStatusCancelled = async (record) => {
    try {
      const response = await appointmentService.setAppointmentCancelled(record);
      getAppointmentsByCustomer(customer.customerId);
      console.log(response);
      message.error("Randevu reddedildi!");
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

  const columns = [
    {
      title: "Personel",
      key: "staffFullName",
      render: (_, record) => (
        <strong><i>{formatFullName(record.staff.firstName, record.staff.lastName)}</i></strong>
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
          <Tooltip title="İptal Et">
            <Popconfirm
              title="İptal etmek istediğinize emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              onConfirm={() => setAppointmentStatusCancelled(record)}
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
        </>
      ),
      width: 100,
    },
  ];


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Randevularım</h1>
      <Table
        columns={columns}
        dataSource={appointments}
        pagination={false}
        bordered
        size="middle"
        style={{ maxWidth: "1250px", margin: "0 auto" }}
      />
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
    </div>
  );
}

export default CustomerAppointments;
