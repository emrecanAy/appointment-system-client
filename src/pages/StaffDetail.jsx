import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Row, Col, Card, Table, message, Popconfirm } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import StaffService from "../api/StaffService.ts";

const { Option } = Select;

const staffService = new StaffService();

const StaffDetail = () => {
  const [staff, setStaff] = useState({});
  const [form] = Form.useForm(); 
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const response = await staffService.updateStaff({...values, staffId});
    message.success(`Personel güncellendi!`);
    console.log(response);
    console.log("Received values:", values);
  };

  const handleDelete = async () => {
    const response = await staffService.deleteStaff(staff);
    console.log(response);
    message.warning(`${staff.firstName + " " + staff.lastName} silindi!`);
    navigate('/staff');
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

  useEffect(() => {
    getStaffById();
  }, [staffId]);

  useEffect(() => {
    // staff state'i değiştiğinde formun başlangıç değerlerini güncelle
    form.setFieldsValue(staff);
  }, [staff]);

  // Örnek veri
  const data = [
    { key: 1, name: "John Doe", age: 30, role: "Admin" },
    { key: 2, name: "Jane Doe", age: 28, role: "Staff" },
    { key: 3, name: "Justin Doe", age: 23, role: "Staff" },
    { key: 4, name: "James Doe", age: 23, role: "Staff" },
    // Diğer örnek verileri ekleyebilirsiniz.
  ];

  // Kolonlar
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  if (!staff) {
    return <div>Loading...</div>; 
  }

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
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
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
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
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
                label="Username"
                name="userName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
               label="Image"
               name="imagePath"
               rules={[
                 { required: true, message: "Please input the image path!" },
               ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Role"
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
                  <Button type="primary" style={{ marginLeft: 8, backgroundColor: "firebrick" }}>
                    Sil
                  </Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Yapılan İşlemler ve İzinler */}
        <Col span={12}>
          <Card title="Yapılan İşlemler" style={{ width: "100%" }}>
            <Table dataSource={data} columns={columns} size="small" />
          </Card>

          <Card title="Son İşlemler" style={{ width: "100%" }}>
            <Table dataSource={data} columns={columns} size="small" />
          </Card>

          <Card title="İzinler" style={{ width: "100%" }}>
            <Table dataSource={data} columns={columns} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDetail;
