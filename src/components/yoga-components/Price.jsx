import React from "react";

function Price() {
  return (
    <div className="price">
      <div className="container">
        <div
          className="section-header text-center wow zoomIn"
          data-wow-delay="0.1s"
        >
          <p>Yoga Package</p>
          <h2>Yoga Pricing Plan</h2>
        </div>
        <div className="row">
          <div className="col-md-4 wow fadeInUp" data-wow-delay="0.0s">
            <div className="price-item">
              <div className="price-header">
                <div className="price-title">
                  <h2>Basic</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>$</small>49<span>/ mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Personal Trainer</li>
                    <li>Special Class</li>
                    <li>Free Tutorials</li>
                    <li>Group Training</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <a className="btn" href>
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="price-item featured-item">
              <div className="price-header">
                <div className="price-status">
                  <span>Popular</span>
                </div>
                <div className="price-title">
                  <h2>Standard</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>$</small>99<span>/ mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Personal Trainer</li>
                    <li>Special Class</li>
                    <li>Free Tutorials</li>
                    <li>Group Training</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <a className="btn" href>
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 wow fadeInUp" data-wow-delay="0.6s">
            <div className="price-item">
              <div className="price-header">
                <div className="price-title">
                  <h2>Premium</h2>
                </div>
                <div className="price-prices">
                  <h2>
                    <small>$</small>149<span>/ mo</span>
                  </h2>
                </div>
              </div>
              <div className="price-body">
                <div className="price-description">
                  <ul>
                    <li>Personal Trainer</li>
                    <li>Special Class</li>
                    <li>Free Tutorials</li>
                    <li>Group Training</li>
                  </ul>
                </div>
              </div>
              <div className="price-footer">
                <div className="price-action">
                  <a className="btn" href>
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Price;
