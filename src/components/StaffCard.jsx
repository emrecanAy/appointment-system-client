import { Avatar, List } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";


function StaffCard({ staff, staffCareServices }) {
  return (
    <Card key={staff.staffId} style={{ width: 300, marginBottom: 16 }}>
      <Meta
        avatar={<Avatar src={staff.imagePath} />}
        title={staff.firstName + " " + staff.lastName}
        description={staff.role}
      />
      <div style={{ marginTop: "16px" }}>
        <List
          size="small"
          dataSource={staffCareServices.filter(data => data.staff.staffId === staff.staffId)}
          renderItem={(item) => <List.Item key={item.staffCareServiceId}>{item.careService.careServiceName}</List.Item>}
        />
      </div>
    </Card>
  );
}

export default StaffCard;
