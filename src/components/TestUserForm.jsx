import React from "react";
import { Form, Input, Button, Select, Row, Col, Card, Divider } from "antd";

const { Option } = Select;

const UserForm = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

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
              <h2>Ad Soyad</h2>
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
          <Card title="Yapılan İşlemler" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="İşlem 1" bordered={false} size="small">
                  Detaylar...
                </Card>
              </Col>
              <Col span={24}>
                <Card title="İşlem 2" bordered={false} size="small">
                  Detaylar...
                </Card>
              </Col>
            </Row>
          </Card>

          <Divider />

          <Card title="İzinler" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="İzin 1" bordered={false} size="small">
                  Detaylar...
                </Card>
              </Col>
              <Col span={24}>
                <Card title="İzin 2" bordered={false} size="small">
                  Detaylar...
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserForm;
