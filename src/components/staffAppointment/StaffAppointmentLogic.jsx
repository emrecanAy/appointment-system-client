import { Checkbox, Table } from "antd";
import React, { useEffect, useState } from "react";

import StaffCareServiceService from "../../api/StaffCareServiceService.ts";
import AppointmentScheduler from "../AppointmentSchedular.jsx";

const staffCareServiceService = new StaffCareServiceService();

function StaffAppointmentLogic({ staff }) {
  const [staffCareServices, setStaffCareServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const getAllServicesByStaff = async (staffId) => {
    try {
      const response = await staffCareServiceService.getAllByStaff(staffId);
      console.log(1453, response.data);
      setStaffCareServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServicesByStaff(staff.staffId);
  }, [staff.staffId]);

  const handleCheckboxChange = (e, record) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectedServices((prevSelectedRows) => [...prevSelectedRows, record]);
    } else {
      setSelectedServices((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== record)
      );
    }
  };

  useEffect(() => {
    console.log(selectedServices);
  }, [selectedServices]);

  const columns = [
    {
      title: "Hizmet",
      dataIndex: ["careService", "careServiceName"],
      key: "careService.careServiceName",
    },
    {
      title: "Açıklama",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Fiyat",
      dataIndex: "careServicePrice",
      key: "price",
    },
    {
      title: "Süre",
      dataIndex: "careServiceDuration",
      key: "careServiceDuration",
    },
    {
      title: "Seç",
      dataIndex: "select",
      key: "select",
      render: (_, record) => <Checkbox
      onChange={(e) => handleCheckboxChange(e, record)}
      checked={selectedServices.includes(record)}
    />,
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Kuaför Hizmetleri</h2>
      <Table
        columns={columns}
        dataSource={staffCareServices}
        pagination={false}
        bordered
        size="middle"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      />
      

      <div>
        <AppointmentScheduler staffId={staff.staffId} selectedServices={selectedServices}/>
      </div>
    </div>
  );
}

export default StaffAppointmentLogic;
