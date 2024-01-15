import { Button, Form, Input, message } from "antd";
import React from "react";

function StaffForm({ staffService, staff }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const staffId = staff.staffId;
    if (values.password === values.confirmPassword) {
      await staffService.updateStaff({ ...values, staffId });
      message.success(`Personel güncellendi!`);
    } else {
      message.error("Parolalar uyuşmuyor!");
    }
  };

  return (
    <div>
     {
      staff ? ( <Form
        name="staffForm"
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
          label="E-Posta"
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
          <Input.Password visibilityToggle={false}/>
        </Form.Item>
        <Form.Item
          label="Parolayı Onayla"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your password again!" },
          ]}
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

        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </Form.Item>
      </Form>) : (<></>)
     }
    </div>
  );
}

export default StaffForm;
