import React from "react";

function Discount() {
  return (
    <div className="discount wow zoomIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="section-header text-center">
          <p>Awesome Discount</p>
          <h2>
            Get <span>30%</span> Discount for all Classes
          </h2>
        </div>
        <div className="container discount-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec pretium mi. Curabitur facilisis ornare velit non vulputate.
            Aliquam metus tortor, auctor id gravida condimentum, viverra quis
            sem. Curabitur non nisl nec nisi scelerisque maximus.
          </p>
          <a className="btn">Join Now</a>
        </div>
      </div>
    </div>
  );
}

export default Discount;
