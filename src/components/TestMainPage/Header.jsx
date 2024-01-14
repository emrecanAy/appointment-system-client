import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-area header-transparent pt-20">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* <!-- Logo --> */}
              <div className="col-xl-2 col-lg-2 col-md-1">
                <div >
                  <a href="index.html">
                    <img src="img/logo/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                <div className="menu-main d-flex align-items-center justify-content-end">
                  {/* <!-- Main-menu --> */}
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li className="active">
                          <div><Link to={"/"}>Ana Sayfa</Link></div>
                        </li>
                        <li>
                          <div><Link to={"/saloons"}>Salon Bul</Link></div>
                        </li>
                        <li>
                          <div><Link to={"/our-team"}>Ekip</Link></div>
                        </li>
                        <li>
                          <a href="portfolio.html">Hizmetler</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                          <ul className="submenu">
                            <li>
                              <a href="blog.html">Blog</a>
                            </li>
                            <li>
                              <a href="blog_details.html">Blog Details</a>
                            </li>
                            <li>
                              <a href="elements.html">Element</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="contact.html">İletişim</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    <a href="from.html" className="btn header-btn">
                      işletmeni kaydet
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Mobile Menu --> */}
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
