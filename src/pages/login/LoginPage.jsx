import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Radio } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import StaffService from "../../api/StaffService.ts";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from "../../api/CustomerService.ts";
import { Role } from "../../api/models/enums/Role.ts";

const staffService = new StaffService();
const customerService = new CustomerService();

const App = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(Role.CUSTOMER);

  const handleStaffLogin = async (email, password) => {
    try {
      const response = await staffService.getStaffByEmailAndPassword(
        email,
        password
      );
      if (response.data) {
        localStorage.setItem("staff", JSON.stringify(response.data));
        message.success("Giriş başarılı!");
        response.data.role === "ADMIN"
          ? navigate("/dashboard", { state: { user: response.data } })
          : navigate(`/dashboard/staff-stats/${response.data.staffId}`, {
              state: { user: response.data },
            });
      }
    } catch (error) {
      message.error("Hatalı kullanıcı adı veya şifre girdiniz!");
    }
  };

  const handleCustomerLogin = async (email, password) => {
    try {
      const response = await customerService.getCustomerByEmailAndPassword(
        email,
        password
      );
      if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
        message.success("Giriş başarılı!");
        navigate(`/customer/${response.data.customerId}`);
      }
    } catch (error) {
      message.error("Hatalı kullanıcı adı veya şifre girdiniz!");
    }
  };

  const onFinish = (values) => {
    role === Role.STAFF
      ? handleStaffLogin(values.email, values.password)
      : handleCustomerLogin(values.email, values.password);
  };

  const handleRoleChange = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setRole(value);
  };

  const options = [
    {
      label: "MÜŞTERİ",
      value: Role.CUSTOMER,
    },
    {
      label: "PERSONEL",
      value: Role.STAFF,
    },
  ];

  return (
    <div className="login-container">
      <div className="login-buttons-container">
        <Radio.Group
          options={options}
          onChange={handleRoleChange}
          value={role}
          optionType="button"
          buttonStyle="solid"
          className="custom-radio-group"
          style={{
            display: "flex",
          }}
        />
      </div>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="login-title">Giriş Yap</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Eposta"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Beni hatırla</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Parolamı unuttum
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            danger
            htmlType="submit"
            className="login-form-button"
          >
            Giriş Yap
          </Button>
          Hemen{" "}
          <Link style={{ color: "firebrick" }} to={"/register"}>
            kayıt ol!
          </Link>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <LeftCircleOutlined
            style={{ fontSize: "25px" }}
            onClick={() => navigate("/")}
          />
        </div>
      </Form>
    </div>
  );
};

export default App;
