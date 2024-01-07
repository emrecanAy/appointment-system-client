import React from 'react'
import Slider from "./Slider";
import Services from "./Services";
import Team from "./Team";
import AboutPart from './AboutPart';
import BestPricing from "./BestPricing";
import Gallery from "./Gallery";
import CutDetails from "./CutDetails";
import Blog from "./Blog";
import Footer from "./Footer";
import HeaderResponsive from "./HeaderResponsive"

function HomePage() {
  return (
    <div>
        <HeaderResponsive />
        <main>
            <Slider/>
            <AboutPart/>
            <Services/>
            <Team/>
            <BestPricing/>
            <Gallery/>
            <CutDetails/>
            <Blog/>
        </main>
        <Footer/>
    </div>
  )
}

export default HomePage