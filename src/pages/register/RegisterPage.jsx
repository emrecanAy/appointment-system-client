import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LeftCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../api/CustomerService.ts";

const { Option } = Select;

const customerService = new CustomerService();

const RegisterPage = () => {
  const navigate = useNavigate();

  const validateUsernameRule = async (_, value) => {
    try {
      const response = await customerService.getCustomerByUsername(value);
      if (response.data) {
        return Promise.reject("Bu kullanıcı adı zaten kayıtlı!");
      } else {
        return Promise.resolve();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const validateEmailRule = async (_, value) => {
    try {
      const response = await customerService.getCustomerByEmail(value);
      if (response.data) {
        return Promise.reject("Bu e-posta adresi zaten kayıtlı!");
      } else {
        return Promise.resolve();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const register = async (values) => {
    try {
      message.error("Girmiş olduğunuz e-posta adresi daha önceden kayıtlı!");

      const response = await customerService.createCustomer(values);
      response
        ? message.success("Başarıyla kayıt olundu!")
        : message.error("Hata!");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinish = (values) => {
    delete values.confirmPassword;
    register(values);
  };

  return (
    <div className="login-container">
      <Form
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="login-title">Kayıt Ol</h1>
        <Form.Item
          className="input-style"
          name="firstName"
          rules={[{ required: true, message: "Lütfen adınızı girin!" }]}
        >
          <Input
            color="red"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Ad"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Lütfen soyadınızı girin!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Soyad"
          />
        </Form.Item>
        <Form.Item
          prefix={<UserOutlined className="site-form-item-icon" />}
          name="gender"
          rules={[{ required: true, message: "Lütfen cinsiyetinizi seçin!" }]}
        >
          <Select placeholder="Cinsiyet Seçiniz" allowClear>
            <Option value="MALE">Erkek</Option>
            <Option value="FEMALE">Kadın</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="userName"
          rules={[
            { required: true, message: "Lütfen kullanıcı adınızı girin!" },
            { validator: validateUsernameRule },
          ]}
        >
          <Input
            prefix={<PushpinOutlined className="site-form-item-icon" />}
            placeholder="Kullanıcı Adı"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Lütfen e-postanızı girin!",
            },
            {
              validator: validateEmailRule,
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-posta"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Lütfen telefon numaranızı girin!" },
            {
              pattern: /^(05\d{9})$/,
              message: "Lütfen geçerli bir telefon numarası girin!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Telefon"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Lütfen parolanızı girin!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Lütfen parolanızı onaylayın!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Parolalar eşleşmiyor!"));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola Tekrar"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            danger
          >
            Kayıt Ol
          </Button>
          Hemen{" "}
          <a style={{ color: "firebrick" }} href="/">
            giriş yap!
          </a>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <LeftCircleOutlined
            style={{ fontSize: "25px" }}
            onClick={() => navigate("/login")}
          />
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
