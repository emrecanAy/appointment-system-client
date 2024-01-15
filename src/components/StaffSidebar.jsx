import React, { useEffect, useState } from "react";
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
  SnippetsOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Image, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
const { Text } = Typography;

function StaffSidebar({ currentUser }) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div>
        {collapsed ? (
          <UserOutlined />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px",
            }}
          >
            {collapsed ? (
              <UserOutlined style={{ fontSize: "32px", color: "#fff" }} />
            ) : (
              <Image src={currentUser.imagePath} size={64} />
            )}
            {!collapsed && (
              <div style={{ textAlign: "center", marginTop: "8px" }}>
                <Text strong style={{ fontSize: "18px", color: "#fff" }}>
                  {currentUser.firstName + " " + currentUser.lastName}
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#fff",
                    display: "block",
                  }}
                >
                  PERSONEL
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={"/dashboard"}>Ana Sayfa</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SnippetsOutlined />}>
          <Link>
            <Link to={`staff-careservices/${currentUser.staffId}`}>
              Bakım Servislerim
            </Link>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ScheduleOutlined />}>
          <Link to={`staff-appointments/${currentUser.staffId}`}>
            Randevu İşlemlerim
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PieChartOutlined />}>
          <Link to={`staff-permissions/${currentUser.staffId}`}>
            İzin İşlemlerim
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          <Link to={`configs/${currentUser.staffId}`}>Kişisel Ayarlarım</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FileOutlined />}>
          <Link to={"/"}>Sayfaya Git</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default StaffSidebar;
