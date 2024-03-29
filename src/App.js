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
import StatisticsPage from "./components/StatisticsPage";
import Team from "./components/TestMainPage/Team";
import ComingSoonPage from "./pages/coming-soon/ComingSoonPage";
import StaffConfigsPage from "./pages/staff/StaffConfigsPage";
import StaffAppointmentPage from "./pages/StaffAppointmentPage";
import StaffCareServicesPage from "./pages/staff/StaffCareServicesPage";
import StaffAppointmentOperationsPage from "./pages/staff/StaffAppointmentOperationsPage";
import StaffPermissionOperationsPage from "./pages/staff/StaffPermissionOperationsPage";
import StaffStatisticsPage from "./pages/staff/StaffStatisticsPage";
import CustomerProfilePage from "./pages/customer/CustomerProfilePage";
import CareServicesPage from "./pages/CareServicesPage";
import FilteredTeam from "./components/team/FilteredTeam";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test5" element={<ComingSoonPage />} />
        <Route path="/our-team" element={<Team />} />
        <Route path="/our-team/:careServiceId" element={<FilteredTeam />} />
        <Route path="/saloons" element={<ComingSoonPage />} />
        <Route path="/blog" element={<ComingSoonPage />} />
        <Route path="/contact" element={<ComingSoonPage />} />
        <Route path="/services" element={<CareServicesPage />} />
        <Route
          path="/staff-detail/:staffId"
          element={<StaffAppointmentPage />}
        />
        <Route
          path="/customer/:customerId"
          element={<CustomerProfilePage />}
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<StatisticsPage />} />
          <Route path="staff-stats/:staffId" element={<StaffStatisticsPage />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/add" element={<UserForm />} />
          <Route path="staff/:staffId" element={<StaffDetail />} />
          <Route path="care-services" element={<CareService />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="staffconfigs" element={<StaffConfigs />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="configs/:staffId" element={<StaffConfigsPage />} />
          <Route
            path="staff-careservices/:staffId"
            element={<StaffCareServicesPage />}
          />
          <Route
            path="staff-appointments/:staffId"
            element={<StaffAppointmentOperationsPage />}
          />
          <Route
            path="staff-permissions/:staffId"
            element={<StaffPermissionOperationsPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
