import React, { useState } from "react";
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
              <Image src={currentUser.imageUrl} size={64} />
            )}
            {!collapsed && (
              <div style={{ textAlign: "center", marginTop: "8px" }}>
                <Text strong style={{ fontSize: "18px", color: "#fff" }}>
                  {currentUser.name}
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Ana Sayfa
        </Menu.Item>
        <SubMenu key="sub3" icon={<UserOutlined />} title="Kuaför İşlemleri">
          <Menu.Item key="2">
            <Link
              to={"/care-services"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Bakım Servisleri
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={"/staff/testadd"}>Bill</Link>
          </Menu.Item>
          <Menu.Item key="4">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          icon={<DesktopOutlined />}
          title="Personel İşlemleri"
        >
          <Menu.Item key="5">
            <Link to={"/staff"}>Personeller</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to={"/staffconfigs"}>Personel Ayarları</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Randevu İşlemleri">
          <Menu.Item key="6"><Link to={"/appointments"}>Tüm Randevular</Link></Menu.Item>
          <Menu.Item key="7">Bill</Menu.Item>
          <Menu.Item key="8">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="İzin İşlemleri">
          <Menu.Item key="9">
            <Link to={"/permissions"}>İzin Talepleri</Link>
          </Menu.Item>
          <Menu.Item key="10">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="11" icon={<FileOutlined />}>
          <Link to={"/test"}>Sayfaya Git</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
