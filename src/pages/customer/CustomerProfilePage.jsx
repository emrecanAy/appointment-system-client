import React from "react";
import StaffAppointmentDetail from "../../components/TestMainPage/StaffAppointmentDetail";
import HeaderResponsiveTest from "../../components/TestMainPage/HeaderResponsiveTest";
import Footer from "../../components/TestMainPage/Footer";
import CustomerAppointments from "./CustomerAppointments";

const customer = {
  customerId: "b2961bbe-260f-4693-bd1a-8fcd63388c91",
  firstName: "Şaban",
  lastName: "Dönmez",
  email: "saban@gmail.com",
  gender: "MALE",
  phoneNumber: "05678945612",
  userName: "saban_aga",
  imagePath: "https://media.licdn.com/dms/image/C4E03AQEZPsR0sUePRw/profile-displayphoto-shrink_800_800/0/1599784612687?e=2147483647&v=beta&t=meQQ_GBd7_HGmtQS3J6jfFYFW5yVetU7P1SGLVJ334I"
};

function CustomerProfilePage() {
  return (
    <div>
      <HeaderResponsiveTest />
      <main>
        <StaffAppointmentDetail staff={customer} />
        <CustomerAppointments customer={customer}/>
      </main>
      <Footer />
    </div>
  );
}

export default CustomerProfilePage;
