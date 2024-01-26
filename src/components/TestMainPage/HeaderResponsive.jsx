import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderResponsive.css";
import { message } from "antd";

function Header({ customer }) {

  const navigate = useNavigate();
  const customerData = JSON.parse(localStorage.getItem('customer'));
  console.log("HEADER:", customer);
  const staff = JSON.parse(localStorage.getItem('staff'));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
    message.success("Çıkış yapıldı!");
  }

  return (
    <header>
      <div
        className="header-area header-transparent pt-20"
        style={{ backgroundColor: "black" }}
      >
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-2 col-md-1">
                <div>
                  <Link href="/">
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
                            <li >Salon Bul</li>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/our-team"}>
                            <div>Ekip</div>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/services"}>
                            <div>Hizmetler</div>
                          </Link>
                        </li>
                        {
                          customerData ? ( <li>
                            <Link to={"/customer/a4d52h5b2d5db22h5"}>
                              <div>Profil</div>
                            </Link>
                          </li>) : (<></>)
                        }
                       

                        <li>
                          <Link to={"/contact"}>
                            <div>İletişim</div>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div>
                    {!customerData ? (
                      <div>
                        <div className="header-right-btn f-right d-none d-lg-block ml-30">
                          <Link to={"/register"}>
                            <div
                              className="btn header-btn"
                              style={{ color: "black" }}
                            >
                              İşletmeni Kaydet
                            </div>
                          </Link>
                        </div>
                        <div className="header-right-btn f-right d-none d-lg-block ml-30">
                          <Link to={"/login"}>
                            <div
                              className="btn header-btn"
                              style={{ color: "black" }}
                            >
                              Giriş Yap
                            </div>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="header-right-btn f-right d-none d-lg-block ml-30">
                        <Link to={"/"}>
                          <div
                            onClick={handleLogout}
                            className="btn header-btn"
                            style={{ color: "black" }}
                          >
                            Çıkış Yap
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
