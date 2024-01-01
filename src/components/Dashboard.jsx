import { Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import React, {  useEffect, useState } from "react";

import "../styles/Dashboard.css";
import AdminFooter from "./AdminFooter";
import { Route, Routes } from "react-router-dom";
import UserForm from "./UserForm";
import StaffDetail from "../pages/StaffDetail";
import CareService from "../pages/CareService";
import Permissions from "../pages/Permissions";
import Staff from "../pages/Staff";
import Sidebar from "./Sidebar";
import StaffConfigs from "../pages/StaffConfigs";
import AppointmentsPage from "../pages/AppointmentsPage";

function Dashboard() {
  
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Emrecan AY",
    profession: "Software Engineer",
    avatar: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
    imageUrl: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg"
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar currentUser={currentUser}/>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route path="/staff" element={<Staff />} />
            <Route path="/staff/add" element={<UserForm />} />
            <Route path="/staff/:staffId" element={<StaffDetail />} />
            <Route path="/care-services" element={<CareService />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/staffconfigs" element={<StaffConfigs />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Routes>
        </Content>

        <AdminFooter />
      </Layout>
    </Layout>
  );
}

export default Dashboard;
