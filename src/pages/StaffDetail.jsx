import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Table,
  message,
  Popconfirm,
  Statistic,
  Space,
} from "antd";
import CountUp from "react-countup";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import StaffService from "../api/StaffService.ts";
import AppointmentService from "../api/AppointmentService.ts";
import StaffCareServiceService from "../api/StaffCareServiceService.ts";
import EditStaffCareServiceModal from "../components/EditStaffCareServiceModal.jsx";

const { Option } = Select;

//Services
const staffService = new StaffService();
const appointmentService = new AppointmentService();
const staffCareServiceService = new StaffCareServiceService();

const StaffDetail = () => {
  //States
  const [staff, setStaff] = useState({});
  const [totalEarning, setTotalEarning] = useState(0);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [staffCareServices, setStaffCareServices] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStaffCareService, setSelectedStaffCareService] = useState({});

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await staffService.updateStaff({ ...values, staffId });
    message.success(`Personel güncellendi!`);
    console.log(response);
    console.log("Received values:", values);
  };

  const handleDelete = async () => {
    const response = await staffService.deleteStaff(staff);
    console.log(response);
    message.warning(`${staff.firstName + " " + staff.lastName} silindi!`);
    navigate("/staff");
  };

  const { staffId } = useParams();

  const getStaffById = async () => {
    try {
      const response = await staffService.getStaffById(staffId);
      setStaff(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAcceptedAppointmentsByStaff = async (staffId) => {
    try {
      const response =
        await appointmentService.getAllAcceptedAppointmentsByStaff(staffId);
      setAcceptedAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalEarningsByStaff = async (staffId) => {
    try {
      const response = await appointmentService.getTotalEarningsByStaff(
        staffId
      );
      setTotalEarning(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStaffCareServicesByStaff = async (staffId) => {
    try {
      const response = await staffCareServiceService.getAllByStaff(staffId);
      setStaffCareServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStaffCareService = (record) => {
    setSelectedStaffCareService(record);
    setEditModalVisible(true);
  };

  const handleUpdateStaffCareService = async (values) => {
    values.staffCareServiceId = selectedStaffCareService.staffCareServiceId;
    values.careServiceId = selectedStaffCareService.careService.careServiceId;
    values.staffId = selectedStaffCareService.staff.staffId;

    const response = await staffCareServiceService.updateStaffCareService(values);
    message.success("Güncellendi!");
    console.log("Güncelleme işlemi:", values);
    console.log(selectedStaffCareService)
    setEditModalVisible(false);
  };

  const onCareServiceDeleteConfirm = async (record) => {
    console.log(record);
    const response = await staffCareServiceService.deleteStaffCareService(
      record
    );
    console.log(response);
    message.success(`silindi!`);
  };
  const onCareServiceDeleteCancel = (e) => {
    message.error("İptal edildi!");
  };

  useEffect(() => {
    getStaffById();
    getTotalEarningsByStaff(staffId);
    getAllAcceptedAppointmentsByStaff(staffId);
    getAllStaffCareServicesByStaff(staffId);
  }, [staffId, staffCareServices]);

  useEffect(() => {
    // staff state'i değiştiğinde formun başlangıç değerlerini güncelle
    form.setFieldsValue(staff);
  }, [staff]);

  const columns = [
    {
      title: "Hizmet",
      dataIndex: ["careService", "careServiceName"],
      key: "careService.careServiceName",
    },
    { title: "Fiyat", dataIndex: "careServicePrice", key: "careServicePrice" },
    {
      title: "Süre",
      dataIndex: "careServiceDuration",
      key: "careServiceDuration",
    },
    {
      title: "İşlemler",
      key: "edit",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditStaffCareService(record)}
            />
          </Space>
          <Space size="middle">
            <Popconfirm
              title="Sil"
              description="Silmek istediğinize emin misiniz?"
              onConfirm={() => onCareServiceDeleteConfirm(record)}
              onCancel={onCareServiceDeleteCancel}
              okText="Evet"
              cancelText="İptal"
            >
              <Button
                type="primary"
                style={{ backgroundColor: "firebrick", marginLeft: 5 }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  if (!staff) {
    return <div>Loading...</div>;
  }

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Form */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <img src={staff.imagePath} alt="User" style={{ width: "25%" }} />
              <h2 id={"fullname"}>
                {staff ? staff.firstName + " " + staff.lastName : "Loading..."}
              </h2>
            </div>

            <Form
              name="userForm"
              initialValues={staff}
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              form={form}
            >
              <Form.Item
                label="Ad"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Soyad"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Eposta"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Telefon Numarası"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Kullanıcı Adı"
                name="userName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Parola"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Fotoğraf"
                name="imagePath"
                rules={[
                  { required: true, message: "Please input the image path!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Rol"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select>
                  <Option value="0">Admin</Option>
                  <Option value="1">Staff</Option>
                </Select>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
                <Popconfirm
                  title="Personeli silmek istediğinizden emin misiniz?"
                  onConfirm={handleDelete}
                  okText="Evet"
                  cancelText="Hayır"
                >
                  <Button
                    type="primary"
                    style={{ marginLeft: 8, backgroundColor: "firebrick" }}
                  >
                    Sil
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Hizmetler ve İzinler */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Toplam İşlem"
                  value={acceptedAppointments.length}
                  precision={2}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Toplam Kazanç(₺)"
                  value={totalEarning}
                  formatter={formatter}
                />
              </Col>
            </Row>
          </Card>

          <Card title="Hizmetler" style={{ width: "100%" }}>
            <Table
              dataSource={staffCareServices}
              columns={columns}
              size="small"
              rowKey={(record) => record.staffCareServiceId}
            />
            {/* Edit Modal */}
            <EditStaffCareServiceModal
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              onUpdate={handleUpdateStaffCareService}
              initialValues={selectedStaffCareService}
            />
          </Card>

          <Card title="İzinler" style={{ width: "100%" }}>
            <Table dataSource={null} columns={columns} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDetail;
