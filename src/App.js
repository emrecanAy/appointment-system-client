import React from "react";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/TestMainPage/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Staff from "./pages/Staff";
import UserForm from "./components/UserForm";
import StaffDetail from "./pages/StaffDetail";
import CareService from "./pages/CareService";
import StaffConfigs from "./pages/StaffConfigs";
import AppointmentsPage from "./pages/AppointmentsPage";
import Permissions from "./pages/Permissions";
import StaffAppointmentPage from "./pages/StaffAppointmentPage";
import StatisticsPage from "./components/StatisticsPage";
import Team from "./components/TestMainPage/Team";
import ComingSoonPage from "./pages/coming-soon/ComingSoonPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test5" element={<ComingSoonPage />} />
        <Route path="/our-team" element={<Team />} />
        <Route path="/saloons" element={<ComingSoonPage />} />
        <Route path="/blog" element={<ComingSoonPage />} />
        <Route path="/contact" element={<ComingSoonPage />} />
        <Route path="/staff-detail/:staffId" element={<StaffAppointmentPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<StatisticsPage/>} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/add" element={<UserForm />} />
          <Route path="staff/:staffId" element={<StaffDetail />} />
          <Route path="care-services" element={<CareService />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="staffconfigs" element={<StaffConfigs />} />
          <Route path="appointments" element={<AppointmentsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
