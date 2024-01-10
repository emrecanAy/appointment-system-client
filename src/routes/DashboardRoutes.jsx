import { Routes, Route } from 'react-router-dom';
import Staff from '../pages/Staff';
import UserForm from '../components/UserForm';
import StaffDetail from '../pages/StaffDetail';
import CareService from '../pages/CareService';
import StaffConfigs from '../pages/StaffConfigs';
import AppointmentsPage from '../pages/AppointmentsPage';
import Permissions from "../pages/Permissions";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/staff" element={<Staff />} />
      <Route path="/dashboard/staff/add" element={<UserForm />} />
      <Route path="/dashboard/staff/:staffId" element={<StaffDetail />} />
      <Route path="/dashboard/care-services" element={<CareService />} />
      <Route path="/dashboard/permissions" element={<Permissions />} />
      <Route path="/dashboard/staffconfigs" element={<StaffConfigs />} />
      <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
    </Routes>
  );
}