import React from "react";

function Navbar() {
  return (
    <div className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <a href="index.html" className="navbar-brand">
          Y<span>oo</span>ga
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav ml-auto">
            <a href="index.html" className="nav-item nav-link active">
              Home
            </a>
            <a href="about.html" className="nav-item nav-link">
              About
            </a>
            <a href="service.html" className="nav-item nav-link">
              Service
            </a>
            <a href="price.html" className="nav-item nav-link">
              Price
            </a>
            <a href="class.html" className="nav-item nav-link">
              Class
            </a>
            <a href="team.html" className="nav-item nav-link">
              Trainer
            </a>
            <a href="portfolio.html" className="nav-item nav-link">
              Pose
            </a>
            <div className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Blog
              </a>
              <div className="dropdown-menu">
                <a href="blog.html" className="dropdown-item">
                  Blog Grid
                </a>
                <a href="single.html" className="dropdown-item">
                  Blog Detail
                </a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
