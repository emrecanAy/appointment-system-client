import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Divider,
  Table,
} from "antd";
import { useParams } from "react-router-dom";

const { Option } = Select;

const StaffDetail = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const { staffId } = useParams();

  // Örnek veri
  const data = [
    { key: 1, name: "John Doe", age: 30, role: "Admin" },
    { key: 2, name: "Jane Doe", age: 28, role: "Staff" },
    { key: 2, name: "Justin Doe", age: 23, role: "Staff" },
    { key: 2, name: "James Doe", age: 23, role: "Staff" },
    // Diğer örnek verileri ekleyebilirsiniz.
  ];

  // Kolonlar
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Form */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt="User"
                style={{ width: "25%" }}
              />
              <h2>Ad Soyad {staffId}</h2>
            </div>

            <Form
              name="userForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
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
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="user">Staff</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Image" name="image">
                <Input />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
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
