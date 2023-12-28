import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import { useEffect, useState } from "react";

function StaffCard() {
  const [staffs, setStaffs] = useState([]);

  const url = "http://localhost:8080/api/staff/getall";
  const getStaffData = async () => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      alert(`Something went wrong ${error}`);
    }
  };

  useEffect(() => {
    getStaffData()
      .then((data) => setStaffs(data.data))
      .catch((error) => alert(`Something went wrong ${error}`));
  });

  function clicked() {
    console.log(staffs[0]);
  }

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card
        onClick={clicked}
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.itestnstagram.com" />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </Col>
    </Row>
  );
}

export default StaffCard;
