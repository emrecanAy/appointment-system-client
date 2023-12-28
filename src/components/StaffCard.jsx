import { Avatar, List } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";

function StaffCard({ user }) {
  return (
    <Card key={user.id} style={{ width: 300, marginBottom: 16 }}>
      <Meta
        avatar={<Avatar src={user.avatar} />}
        title={user.name}
        description={user.profession}
      />
      <div style={{ marginTop: "16px" }}>
        <List
          size="small"
          dataSource={user.actions}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </Card>
  );
}

export default StaffCard;
