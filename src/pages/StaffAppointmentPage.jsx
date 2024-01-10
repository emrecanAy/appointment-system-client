import React from 'react'
import Footer from "../components/TestMainPage/Footer";
import HeaderResponsiveTest from '../components/TestMainPage/HeaderResponsiveTest';
import StaffAppointmentDetail from '../components/TestMainPage/StaffAppointmentDetail';
import StaffAppointmentLogic from '../components/staffAppointment/StaffAppointmentLogic';
import "./StaffAppointmentLogic.css";

function StaffAppointmentPage() {

  const staff = {
    "staffId": "d7e497d9-aa72-46ec-8753-ee08be984bc2",
    "role": "ADMIN",
    "firstName": "Domanic",
    "lastName": "Campbell",
    "email": "dominic-bro@gmail.com",
    "phoneNumber": "+1 585695523654",
    "userName": "dominic-campbell",
    "password": "123",
    "gender": "MALE",
    "imagePath": "https://i.hizliresim.com/oudb8t3.JPG"
  };

  return (
    <div>
        <HeaderResponsiveTest/>
        <main>
            <StaffAppointmentDetail staff={staff}/>
            <StaffAppointmentLogic staff={staff}/>
        </main>
        <Footer/>
    </div>
  )
}

export default StaffAppointmentPage