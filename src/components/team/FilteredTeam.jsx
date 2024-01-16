import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import "./Team.css";

import StaffService from "../../api/StaffService.ts";
import StaffCareServiceService from "../../api/StaffCareServiceService.ts";
import HeaderResponsive from "../TestMainPage/HeaderResponsive.jsx";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

/* SERVICES */
const staffService = new StaffService();
const staffCareServiceService = new StaffCareServiceService();

function FilteredTeam() {
  const [staff, setStaff] = useState(null);
  const [staffCareServices, setStaffCareServices] = useState(null);

  const { careServiceId } = useParams();

  /* REQUESTS */
  const getAllStaffByCareService = async (careServiceId) => {
    try {
      const response = await staffService.getAllStaffByCareService(careServiceId);
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
    getAllStaffByCareService(careServiceId);
    getAllStaffCareServices();
  }, [careServiceId]);

  return (
    <>
      <div className="container">
        <HeaderResponsive />
        <div className="row" style={{marginTop:"250px"}}>
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
    </>
  );
}

export default FilteredTeam;
