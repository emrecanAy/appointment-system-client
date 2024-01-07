import React from "react";

function Footer() {
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container-fluid">
        <div className="container">
          <div className="footer-info">
            <a href="index.html" className="footer-logo">
              Y<span>oo</span>ga
            </a>
            <h3>123 Street, New York, USA</h3>
            <div className="footer-menu">
              <p>+012 345 67890</p>
              <p>info@example.com</p>
            </div>
            <div className="footer-social">
              <a href>
                <i className="fab fa-twitter" />
              </a>
              <a href>
                <i className="fab fa-facebook-f" />
              </a>
              <a href>
                <i className="fab fa-youtube" />
              </a>
              <a href>
                <i className="fab fa-instagram" />
              </a>
              <a href>
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
        <div className="container copyright">
          <div className="row">
            <div className="col-md-6">
              <p>
                © <a href="#">Your Site Name</a>, All Right Reserved.
              </p>
            </div>
            <div className="col-md-6">
              <p>
                Designed By <a href="https://htmlcodex.com">HTML Codex</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
