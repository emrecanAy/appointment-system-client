import React from "react";

function BestPricing() {
  return (
    <div className="best-pricing section-padding2 position-relative">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xl-7 col-lg-7">
            <div className="section-tittle mb-50">
              <span>Our Best Pricing</span>
              <h2>
                We provide best price
                <br /> in the city!
              </h2>
            </div>
            {/* <!-- Pricing  --> */}
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="pricing-list">
                  <ul>
                    <li>
                      Styling. . . . . . . . . . . . . . . . . . . . . . . . . .
                      . . <span>$25</span>
                    </li>
                    <li>
                      Styling + Color. . . . . . . . . . . . . . . . . . .{" "}
                      <span>$65</span>
                    </li>
                    <li>
                      Styling + Tint. . . . . . . . . . . . . . . . . . . . . .
                      <span>$65</span>
                    </li>
                    <li>
                      {" "}
                      Semi-permanent wave. . . . . . . . . . . . .
                      <span>$65</span>
                    </li>
                    <li>
                      {" "}
                      Cut + Styling. . . . . . . . . . . . . . . . . . . . . .
                      <span>$63</span>
                    </li>
                    <li>
                      {" "}
                      Cut + Styling + Color. . . . . . . . . . . . .{" "}
                      <span>$100</span>
                    </li>
                    <li>
                      {" "}
                      Cut + Styling + Tint. . . . . . . . . . . . . . . .
                      <span>$100</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="pricing-list">
                  <ul>
                    <li>
                      Cut. . . . . . . . . . . . . . . . . . . . . . . . . . . .
                      .<span>$25</span>
                    </li>
                    <li>
                      Shave. . . . . . . . . . . . . . . . . . . . . . . . . .{" "}
                      <span>$65</span>
                    </li>
                    <li>
                      Beard trim. . . . . . . . . . . . . . . . . . . . . .{" "}
                      <span>$65</span>
                    </li>
                    <li>
                      Cut + beard trim. . . . . . . . . . . . . . . . .{" "}
                      <span>$65</span>
                    </li>
                    <li>
                      Cut + shave. . . . . . . . . . . . . . . . . . . . . . .
                      <span>$63</span>
                    </li>
                    <li>
                      Clean up. . . . . . . . . . . . . . . . . . . . . . . . .
                      <span>$100</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- pricing img --> */}
      <div className="pricing-img">
        <img
          className="pricing-img1"
          src="img/gallery/pricing1.png"
          alt=""
        />
        <img
          className="pricing-img2"
          src="img/gallery/pricing2.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default BestPricing;
