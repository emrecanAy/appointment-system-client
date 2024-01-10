import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Input, Modal, Row, Select, Typography, message } from "antd";
import StaffCard from "../components/StaffCard";
import StaffService from "../api/StaffService.ts";
import StaffCareServiceService from "../api/StaffCareServiceService.ts";


const { Text } = Typography;
const { Option } = Select;

//Services
const staffService = new StaffService();
const staffCareServiceService = new StaffCareServiceService();

function Staff() {
  //States
  const [staffs, setStaffs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffCareServices, setStaffCareServices] = useState([]);

  const getAllStaffs = async () => {
    try {
      const response = await staffService.getAllStaff();
      setStaffs(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getAllStaffCareServices = async () => {
    try {
      const response = await staffCareServiceService.getAll();
      setStaffCareServices(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Received values:", values);
    const response = await staffService.createStaff(values);
    message.success("Personel eklendi!");
    console.log(response);
    setIsModalVisible(false);
  };
  


  useEffect(() => {
    getAllStaffs();
    getAllStaffCareServices();
  }, []);

  useEffect(() => {
    getAllStaffs();
  }, [staffs]);

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
      <Row justify="start" align="middle">
        <Col>
          <Text strong style={{ fontSize: "30px" }}>
            Personeller
          </Text>
        </Col>
        <Col style={{marginLeft: '15px'}}>
        <Button type="primary" style={{backgroundColor: 'green'}} onClick={showModal}>
          Yeni Ekle
        </Button>
      </Col>
      </Row>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {staffs.map((staff) => (
          <Link key={staff.staffId} to={`${staff.staffId}`}>
            <StaffCard staff={staff} staffCareServices={staffCareServices}/>
          </Link>
        ))}
      </div>

      <Modal
        title="Yeni Personel Ekle"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="newStaffForm"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Ad"
            name="firstName"
            rules={[{ required: true, message: "Lütfen adı girin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Soyad"
            name="lastName"
            rules={[{ required: true, message: "Lütfen soyadını girin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Lütfen geçerli bir email adresi girin!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefon Numarası"
            name="phoneNumber"
            rules={[
              { required: true, message: "Lütfen telefon numara girin!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rol"
            name="role"
            rules={[{ required: true, message: "Lütfen rol seçin!" }]}
          >
            <Select>
              <Option value="0">Admin</Option>
              <Option value="1">Staf</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Cinsiyet"
            name="gender"
            rules={[{ required: true, message: "Lütfen cinsiyet seçin!" }]}
          >
            <Select>
              <Option value="0">Kadın</Option>
              <Option value="1">Erkek</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Kullanıcı Adı"
            name="userName"
            rules={[
              { required: true, message: "Lütfen kullanıcı adını girin!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifreyi girin!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Profil Resmi Yolu"
            name="imagePath"
            rules={[
              {
                required: true,
                message: "Lütfen profil resminin yolunu girin!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Ekle
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Staff;
