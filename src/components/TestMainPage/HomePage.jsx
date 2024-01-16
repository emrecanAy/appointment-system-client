import React from "react";
import Slider from "./Slider";
import Services from "./Services";
import Team from "./Team";
import AboutPart from "./AboutPart";
import Blog from "./Blog";
// import Footer from "./Footer";
import HeaderResponsive from "./HeaderResponsive";
import Footer from "../footer/Footer";

function HomePage() {

  const customer = JSON.parse(localStorage.getItem('customer'));

  return (
    <div>
      <HeaderResponsive customer={customer}/>
      <main>
        <Slider />
        <AboutPart />
        <Services />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
