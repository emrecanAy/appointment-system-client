import React, { useEffect, useState } from "react";
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
  SnippetsOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import { Image, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
const { Text } = Typography;

function StaffSidebar({ currentUser }) {
  const [collapsed, setCollapsed] = useState(false);
  const imageUrl = "https://static.toiimg.com/photo/msid-67586673/67586673.jpg";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    console.log("staff Sidebar çalıştı: " + currentUser.imageUrl);
  }, []);

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
              <Image src={imageUrl} size={64} />
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
            Bakım Servislerim
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ScheduleOutlined />}>
          Randevu İşlemlerim
        </Menu.Item>
        <Menu.Item key="4" icon={<PieChartOutlined />}>
          İzin İşlemlerim
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          <Link to={`staff-careservices/${currentUser.staffId}`}>
            Kişisel Ayarlarım
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FileOutlined />}>
          <Link to={"/"}>Sayfaya Git</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default StaffSidebar;
