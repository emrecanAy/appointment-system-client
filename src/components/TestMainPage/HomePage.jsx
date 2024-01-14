import React from 'react'
import Slider from "./Slider";
import Services from "./Services";
import Team from "./Team";
import AboutPart from './AboutPart';
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
            <Blog/>
        </main>
        <Footer/>
    </div>
  )
}

export default HomePage