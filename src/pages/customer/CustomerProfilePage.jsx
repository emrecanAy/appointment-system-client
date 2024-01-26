import React, { useEffect, useState } from "react";
import HeaderResponsive from "../../components/TestMainPage/HeaderResponsive";
import Footer from "../../components/TestMainPage/Footer";
import CustomerAppointments from "./CustomerAppointments";
import CustomerDetails from "./CustomerDetails";
import { useParams } from "react-router-dom";
import CustomerService from "../../api/CustomerService.ts";

const customer = {
  customerId: "b2961bbe-260f-4693-bd1a-8fcd63388c91",
  firstName: "Şaban",
  lastName: "Dönmez",
  email: "saban@gmail.com",
  gender: "MALE",
  phoneNumber: "05678945612",
  userName: "saban_aga",
  imagePath:
    "https://media.licdn.com/dms/image/C4E03AQEZPsR0sUePRw/profile-displayphoto-shrink_800_800/0/1599784612687?e=2147483647&v=beta&t=meQQ_GBd7_HGmtQS3J6jfFYFW5yVetU7P1SGLVJ334I",
};

const customerService = new CustomerService();

function CustomerProfilePage() {
  const [customer, setCustomer] = useState(null);
  const { customerId } = useParams();

  const getCustomer = async (customerId) => {
    try {
      const response = await customerService.getCustomerById(customerId);
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomer(customerId);
  }, [customerId]);

  return (
    <div>
      <HeaderResponsive />
      <main>
        {customer ? (
          <>
            <CustomerDetails customer={customer} />
            <CustomerAppointments customer={customer} />
          </>
        ) : (
          <></>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CustomerProfilePage;
