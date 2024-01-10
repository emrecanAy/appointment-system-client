import React from "react";
import "./yoga.css";

function About() {
  return (
    <div className="about wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6">
            <div className="about-img">
              <img src="img/about.png" alt={"sdfsd"} />
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="section-header text-left">
              <p>Learn About Us</p>
              <h2>Welcome to Yooga</h2>
            </div>
            <div className="about-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                viverra quis sem.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                viverra quis sem. Curabitur non nisl nec nisi scelerisque
                maximus.
              </p>
              <a className="btn" href>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
