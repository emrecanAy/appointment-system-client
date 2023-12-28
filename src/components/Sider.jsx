import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;  // Corrected import

function Sidebar({currentUser}) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? (
            <UserOutlined />
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
       
              <Image src="https://static.toiimg.com/photo/msid-67586673/67586673.jpg"/>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {currentUser.name}
              </div>
            </div>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Ana Sayfa
          </Menu.Item>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Kuaför İşlemleri">
            <Menu.Item key="2"><Link to={"/care-services"} style={{ color: "inherit", textDecoration: "none" }} >Bakım Servisleri</Link></Menu.Item>
            <Menu.Item key="3">Bill</Menu.Item>
            <Menu.Item key="4">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<DesktopOutlined />}><Link to={"/staff"}>Personel İşlemleri</Link></Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Randevu İşlemleri">
            <Menu.Item key="6">Tüm Randevular</Menu.Item>
            <Menu.Item key="7">Bill</Menu.Item>
            <Menu.Item key="8">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="İzin İşlemleri">
            <Menu.Item key="9">İzin Talepleri</Menu.Item>
            <Menu.Item key="10">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="11" icon={<FileOutlined />}>
            Sayfaya Git
          </Menu.Item>
        </Menu>
      </Sider>
  );
}

export default Sidebar;
