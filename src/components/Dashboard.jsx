import { Layout } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import React, {  useState } from "react";

import "../styles/Dashboard.css";
import AdminFooter from "./AdminFooter";
import { Route, Routes } from "react-router-dom";
import StaffDetail from "./StaffDetail";
import UserForm from "./UserForm";
import TestUserForm from "./TestUserForm";
import CareService from "../pages/CareService";
import Staff from "../pages/Staff";
import Sidebar from "./Sider";

function Dashboard() {
  
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Emrecan AY",
    profession: "Software Engineer",
    avatar: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar currentUser={currentUser}/>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/:staffId" element={<StaffDetail />} />
            <Route path="/staff/add" element={<UserForm />} />
            <Route path="/staff/testadd" element={<TestUserForm />} />
            <Route path="/care-services" element={<CareService />} />
          </Routes>
        </Content>

        <AdminFooter />
      </Layout>
    </Layout>
  );
}

export default Dashboard;
