import React from "react";

function Testimonial() {
  return (
    <div className="testimonial wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="section-header text-center">
          <p>Testimonial</p>
          <h2>Our Client Say!</h2>
        </div>
        <div className="owl-carousel testimonials-carousel">
          <div className="testimonial-item">
            <div className="testimonial-img">
              <img src="img/testimonial-1.jpg" alt="Image" />
            </div>
            <div className="testimonial-text">
              <p>
                Lorem ipsum dolor sit amet consec adipis elit. Etiam accums
                lacus eget velit tincid, quis suscip justo dictum.
              </p>
              <h3>Customer Name</h3>
              <h4>Profession</h4>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-img">
              <img src="img/testimonial-2.jpg" alt="Image" />
            </div>
            <div className="testimonial-text">
              <p>
                Lorem ipsum dolor sit amet consec adipis elit. Etiam accums
                lacus eget velit tincid, quis suscip justo dictum.
              </p>
              <h3>Customer Name</h3>
              <h4>Profession</h4>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-img">
              <img src="img/testimonial-3.jpg" alt="Image" />
            </div>
            <div className="testimonial-text">
              <p>
                Lorem ipsum dolor sit amet consec adipis elit. Etiam accums
                lacus eget velit tincid, quis suscip justo dictum.
              </p>
              <h3>Customer Name</h3>
              <h4>Profession</h4>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-img">
              <img src="img/testimonial-4.jpg" alt="Image" />
            </div>
            <div className="testimonial-text">
              <p>
                Lorem ipsum dolor sit amet consec adipis elit. Etiam accums
                lacus eget velit tincid, quis suscip justo dictum.
              </p>
              <h3>Customer Name</h3>
              <h4>Profession</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
