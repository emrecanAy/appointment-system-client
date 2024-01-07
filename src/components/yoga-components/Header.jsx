import React from "react";

function Header() {
  return (
    <div className="top-bar d-none d-md-block">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="top-bar-left">
              <div className="text">
                <i className="far fa-clock" />
                <h2>8:00 - 9:00</h2>
                <p>Mon - Fri</p>
              </div>
              <div className="text">
                <i className="fa fa-phone-alt" />
                <h2>+123 456 7890</h2>
                <p>For Appointment</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="top-bar-right">
              <div className="social">
                <a href>
                  <i className="fab fa-twitter" />
                </a>
                <a href>
                  <i className="fab fa-facebook-f" />
                </a>
                <a href>
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href>
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
