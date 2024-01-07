import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const TestRegisterPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Burada kayıt işlemleri gerçekleştirilebilir
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', backgroundColor: '#ECF0F1', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#34495E' }}>Kayıt Ol</h2>
      <Form
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Ad Soyad"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Lütfen adınızı ve soyadınızı girin!',
            },
          ]}
        >
          <Input style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          label="E-posta"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Lütfen geçerli bir e-posta adresi girin!',
            },
            {
              required: true,
              message: 'Lütfen e-posta adresinizi girin!',
            },
          ]}
        >
          <Input style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[
            {
              required: true,
              message: 'Lütfen şifrenizi girin!',
            },
          ]}
        >
          <Input.Password style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          label="Şifreyi Onayla"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Lütfen şifrenizi onaylayın!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
              },
            }),
          ]}
        >
          <Input.Password style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item name="agreement" valuePropName="checked">
          <Checkbox>
            <span style={{ color: '#34495E' }}>
              Okudum ve kabul ediyorum <a href="/terms" style={{ color: '#3498DB' }}>şartlar ve koşulları</a>.
            </span>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#3498DB', borderRadius: '6px' }}>
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestRegisterPage;
