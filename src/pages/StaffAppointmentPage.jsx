import React, { useEffect, useState } from "react";
import HeaderResponsive from "../components/TestMainPage/HeaderResponsive.jsx"
import StaffAppointmentDetail from "../components/TestMainPage/StaffAppointmentDetail";
import StaffAppointmentLogic from "../components/staffAppointment/StaffAppointmentLogic";
import "./StaffAppointmentLogic.css";
import { useParams } from "react-router-dom";
import StaffService from "../api/StaffService.ts";
import Footer from "../components/footer/Footer.jsx";

const staffService = new StaffService();

function StaffAppointmentPage() {
  const [staff, setStaff] = useState(null);
  const { staffId } = useParams();

  const getStaffById = async () => {
    try {
      const response = await staffService.getStaffById(staffId);
      setStaff(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStaffById(staffId);
  }, []);

  if(!staff){
    return <></>
  }

  return (
    <div>
      <HeaderResponsive/>
      <main>
        <StaffAppointmentDetail staff={staff} />
        <StaffAppointmentLogic staff={staff} />
      </main>
      <Footer />
    </div>
  );
}

export default StaffAppointmentPage;
