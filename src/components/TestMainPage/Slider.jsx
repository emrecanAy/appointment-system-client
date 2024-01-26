import React from "react";
import { Link } from "react-router-dom";
import StatsCard from "../statistics/StatsCard";

function Slider() {
  const divStyle = {
    // backgroundImage: 'url("https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundImage: 'url("./img/saloon/salon1.jpg")',
    backgroundSize: 'cover', // İsteğe bağlı: görüntüyü kaplamak için
    backgroundRepeat: 'no-repeat', // İsteğe bağlı: tekrarlamayı önlemek için
    // Diğer stil özellikleri buraya eklenebilir
  };
  return (
    <div style={divStyle} className="slider-area fix">
      <div className="slider-active">
        {/* <!-- Single Slider --> */}
        <div className="single-slider slider-height d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-9 col-md-11 col-sm-10">
                <div className="hero__caption">
                  <span data-antion="fadeInUp" data-delay="0.2s">
                    güzellik uzmanı arwen undomiel
                  </span>
                  <h1 data-animation="fadeInUp" data-delay="0.5s">
                   Işıltınızı bİzİmle ortaya çıkarın...
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- stroke Text --> */}
      <div className="stock-text">
      </div>
      {/* <!-- Arrow --> */}
      <div className="thumb-content-box">
        <Link to={"/services"}>
        <div className="thumb-content" >
          <h3>Hemen Randevu Oluştur</h3>
          <div>
            {" "}
            <i className="fas fa-long-arrow-alt-right"></i>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Slider;
