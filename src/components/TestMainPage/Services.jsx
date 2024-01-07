import React from 'react'

function Services() {
  return (
    <section className="service-area pb-170">
    <div className="container">
        {/* <!-- Section Tittle --> */}
        <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-11">
                <div className="section-tittle text-center mb-90">
                    <span>Professional Services</span>
                    <h2>Our Best services that  we offering to you</h2>
                </div>
            </div>
        </div>
        {/* <!-- Section caption --> */}
        <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption text-center mb-30">
                    <div className="service-icon">
                        <i className="flaticon-healthcare-and-medical"></i>
                    </div> 
                    <div className="service-cap">
                        <h4><a href="/">Stylish Hair Cut</a></h4>
                        <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption active text-center mb-30">
                    <div className="service-icon">
                        <i className="flaticon-fitness"></i>
                    </div> 
                    <div className="service-cap">
                        <h4><a href="/">Body Massege</a></h4>
                        <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                    </div>
                </div>
            </div> 
            <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption text-center mb-30">
                    <div className="service-icon">
                        <i className="flaticon-clock"></i>
                    </div> 
                    <div className="service-cap">
                        <h4><a href="/">Breard Style</a></h4>
                        <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Services