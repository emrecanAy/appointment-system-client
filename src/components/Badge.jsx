import { Avatar } from "antd";

import {
 
    UserOutlined,
  } from "@ant-design/icons";

import React from "react";

function Badge() {
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50}} className="demo-logo-vertical">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<UserOutlined />}
        />
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 35}} >
        <h2>Firstname Lastname</h2>
      </div>
    </div>
  );
}

export default Badge;
