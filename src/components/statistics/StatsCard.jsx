import { Card, Statistic } from "antd";
import {
  TeamOutlined,
  FundOutlined,
  CalendarOutlined,
  UserDeleteOutlined
} from "@ant-design/icons";
import React from "react";

function StatsCard({ title, value, suffix, type }) {
  const generateIcon = (type) => {
    if (type === "totalcustomers") {
      return <TeamOutlined style={{ fontSize: "40px", marginRight: "8px" }} />;
    } else if (type === "totalearnings") {
      return <FundOutlined style={{ fontSize: "40px", marginRight: "8px" }} />;
    } else if (type === "totalappointments") {
      return (
        <CalendarOutlined style={{ fontSize: "40px", marginRight: "8px" }} />
      );
    } else if (type === "totalCancelledAppointmentsByCustomer") {
      return (
        <UserDeleteOutlined style={{ fontSize: "40px", marginRight: "8px" }} />
      );
    }
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Statistic title={title} value={value} suffix={suffix}/>
        </div>
        <div>{generateIcon(type)}</div>
      </div>
    </Card>
  );
}

export default StatsCard;
