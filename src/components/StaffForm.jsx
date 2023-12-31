import { Button, Form, Input, Popconfirm, Select, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function StaffForm({ staffService, staff }) {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const staffId = staff.staffId;
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

  return (
    <div>
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
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Soyad"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Parola"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Fotoğraf"
          name="imagePath"
          rules={[{ required: true, message: "Please input the image path!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select>
            <Select.Option value="0">Admin</Select.Option>
            <Select.Option value="1">Staff</Select.Option>
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
    </div>
  );
}

export default StaffForm;
