import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
const { SubMenu } = Menu; // Corrected import
const { Text } = Typography;

function Sidebar({ currentUser }) {
  const [collapsed, setCollapsed] = useState(false);
  const imageUrl ="https://static.toiimg.com/photo/msid-67586673/67586673.jpg";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    console.log("Admin Sidebar çalıştı: "+currentUser)
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
                  YÖNETİCİ
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
        <SubMenu key="sub3" icon={<UserOutlined />} title="Kuaför İşlemleri">
          <Menu.Item key="2">
            <Link
              to={"care-services"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Bakım Servisleri
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          icon={<DesktopOutlined />}
          title="Personel İşlemleri"
        >
          <Menu.Item key="5">
            <Link to={"staff"}>Personeller</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to={"staffconfigs"}>Personel Ayarları</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Randevu İşlemleri">
          <Menu.Item key="6">
            <Link to={"appointments"}>Tüm Randevular</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="İzin İşlemleri">
          <Menu.Item key="9">
            <Link to={"permissions"}>İzin Talepleri</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="11" icon={<FileOutlined />}>
          <Link to={"/"}>Sayfaya Git</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
