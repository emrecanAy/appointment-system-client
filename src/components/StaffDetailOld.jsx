import React, { useEffect } from 'react';
import { Row, Col, Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const StaffDetail = ({ match }) => {

    const { staffId } = useParams();

    useEffect(() => {
        console.log(1453, staffId)
    });
    

  const user = {
    id: staffId,
    name: 'John Doe',
    profession: 'Software Engineer',
    avatar: 'https://example.com/johndoe.jpg',
    actions: ['Task 1', 'Task 2', 'Task 3'],
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
        <Card>
          <Row justify="center" align="middle" gutter={16}>
            <Col>
              <Avatar src={user.avatar} size={100} icon={<UserOutlined />} />
            </Col>
            <Col>
              <Title level={3}>{user.name}</Title>
              <Text type="secondary">{user.profession}</Text>
            </Col>
          </Row>

          <div style={{ marginTop: 20 }}>
            <Title level={4}>Yapılan İşlemler</Title>
            <ul>
              {user.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 20 }}>
            <Title level={4}>İzinler</Title>
            <ul>
              {user.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StaffDetail;