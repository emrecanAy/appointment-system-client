import React, { useEffect, useState } from "react";
import HeaderResponsive from "../components/TestMainPage/HeaderResponsive.jsx";
import CareServiceService from "../api/CareServiceService.ts";
import Footer from "../components/footer/Footer.jsx";
import { useNavigate } from "react-router-dom";

const careServiceService = new CareServiceService();

function CareServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [careServices, setCareServices] = useState(null);

  const navigate = useNavigate();

  const getAllCareServices = async () => {
    try {
      const response = await careServiceService.getAllCareServices();
      setCareServices(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCareServices();
  }, []);
  return (
    <>
    <HeaderResponsive/>
      <section className="service-area pb-170">
        <div className="container">
          {/* <!-- Section Tittle --> */}
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-11">
              <div className="section-tittle text-center mb-90">
                <h2>HİZMETLER</h2>
              </div>
            </div>
          </div>
          {/* <!-- Section caption --> */}
          <div className="row">
            {!isLoading &&
              careServices.map((careService) => (
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30" onClick={() => navigate(`/our-team/${careService.careServiceId}`)}>
                    <div className="service-icon">
                      <i>
                        <img src={careService.imagePath} alt="" />
                      </i>
                    </div>
                    <div className="service-cap">
                      <h4>
                        <a>{careService.careServiceName}</a>
                      </h4>
                      <p>
                        {`${careService.careServiceDescription.substring(
                          0,
                          50
                        )}...`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default CareServicesPage;
