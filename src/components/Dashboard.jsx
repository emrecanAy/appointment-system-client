import { Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";

import "../styles/Dashboard.css";
import AdminFooter from "./AdminFooter";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import StaffSidebar from "./StaffSidebar";

function Dashboard() {
  const location = useLocation();
  const user = location.state && location.state.user;

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user && user.imageUrl) {
      // setCurrentUser((prevUser) => ({
      //   ...prevUser,
      //   imageUrl: user.imageUrl,
      // }));
      setCurrentUser(user);
    }
  }, [user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {currentUser.role === "ADMIN" ? (
        <Sidebar currentUser={currentUser} />
      ) : (
        <StaffSidebar currentUser={currentUser} />
      )}
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
}

export default Dashboard;
