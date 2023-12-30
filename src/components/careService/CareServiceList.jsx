import { List } from "antd";
import React, { useEffect, useState } from "react";
import ServiceCard from "./CareServiceCard";
import CareServiceService from "../../api/CareServiceService.ts";

function CareServiceList({ onEditClick }) {

  //Services
  const careServiceService = new CareServiceService();

  //States
  const [careServices, setCareServices] = useState([]);


  const getAllCareServices = async () => {
    try {
      const response = await careServiceService.getAllCareServices();
      setCareServices(response.data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    getAllCareServices();
  }, [careServices]);

  return (
    <List grid={{ gutter: 16, column: 5 }}
      dataSource={careServices}
      renderItem={(service) => (
        <List.Item key={service.careServiceId}>
          <ServiceCard
            careServiceId={service.careServiceId}
            careServiceName={service.careServiceName}
            careServiceDescription={service.careServiceDescription}
            imagePath={service.imagePath}
            onEditClick={() =>
              onEditClick(
                service.careServiceId,
                service.careServiceName,
                service.careServiceDescription,
                service.imagePath
              )
            }
          />
        </List.Item>)}
        />
  );
}

export default CareServiceList;
