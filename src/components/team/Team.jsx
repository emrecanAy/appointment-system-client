import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import "./Team.css";

import StaffService from "../../api/StaffService.ts";
import StaffCareServiceService from "../../api/StaffCareServiceService.ts";
import HeaderResponsiveTest from "../TestMainPage/HeaderResponsiveTest.jsx";
import { Spin } from "antd";
import Footer from "../TestMainPage/Footer.jsx";

/* SERVICES */
const staffService = new StaffService();
const staffCareServiceService = new StaffCareServiceService();

function Team() {
  const [staff, setStaff] = useState(null);
  const [staffCareServices, setStaffCareServices] = useState(null);

  /* REQUESTS */
  const getAllStaff = async () => {
    try {
      const response = await staffService.getAllStaff();
      setStaff(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStaffCareServices = async () => {
    try {
      const response = await staffCareServiceService.getAll();
      setStaffCareServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* FILTERS */
  const filterStaffCareServicesByStaff = (staffId) => {
    if (staffCareServices) {
      const response = staffCareServices.filter((service) => {
        return service.staff.staffId === staffId;
      });
      return response;
    }
  };

  /* USE EFFECTS */
  useEffect(() => {
    getAllStaff();
    getAllStaffCareServices();
  }, []);

  return (
    <>
      <div className="container">
        <HeaderResponsiveTest />
        <div className="row">
          {staff && staffCareServices ? (
            staff.map((s) => (
              <TeamCard
                key={s.staffId}
                staffId={s.staffId}
                firstName={s.firstName}
                lastName={s.lastName}
                staffCareServices={filterStaffCareServicesByStaff(s.staffId)}
                jobTitle={"Hair Designer"}
                imagePath={s.imagePath}
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Spin />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Team;
