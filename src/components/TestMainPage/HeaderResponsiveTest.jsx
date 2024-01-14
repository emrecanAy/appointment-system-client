import React from "react";
import { Link } from "react-router-dom";
import "./HeaderResponsive.css";

function HeaderResponsiveTest() {
  return (
    <header>
      <div className="header-area header-transparent pt-20" style={{backgroundColor: "black"}}>
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-1">
                <div>
                  <Link href={"/"}>
                    <img src="img/logo/gc1.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                <div className="menu-main d-flex align-items-center justify-content-end">
                  {/* Main-menu */}
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li className="active">
                          <Link to={"/"}>
                            <div>Ana Sayfa</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/saloons"}>
                            <div>Salon Bul</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/our-team"}>
                            <div>Ekip</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/team"}>
                            <div>Hizmetler</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/blog"}>
                            <div>Blog</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/contact"}>
                            <div>İletişim</div>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    <Link to={"/register"}>
                    <div className="btn header-btn" style={{color: "black"}}>
                      İşletmeni Kaydet
                    </div>
                    </Link>
                  </div>
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    <Link to={"/login"}>
                    <div className="btn header-btn" style={{color: "black"}}>
                      Giriş Yap
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Mobile Menu */}
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

export default HeaderResponsiveTest;
