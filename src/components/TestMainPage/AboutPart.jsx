import React from "react";

function AboutPart() {
  return (
    <section className="about-area section-padding30 position-relative">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-11">
            {/* <!-- about-img --> */}
            <div className="about-img ">
              <img src="img/gallery/about.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="about-caption">
              {/* <!-- Section Tittle --> */}
              <div className="section-tittle section-tittle3 mb-35">
                <span>About Our company</span>
                <h2>52 Years Of Experience In Hair cut!</h2>
              </div>
              <p className="mb-30 pera-bottom">
                Brook presents your services with flexible, convenient and cdpoe
                layouts. You can select your favorite layouts & elements for
                cular ts with unlimited ustomization possibilities.
                Pixel-perfreplication of the designers is intended.
              </p>
              <p className="pera-top mb-50">
                Brook presents your services with flexible, convefnient and ent
                anipurpose layouts. You can select your favorite.
              </p>
              <img src="img/gallery/signature.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About Shape --> */}
      <div className="about-shape">
        <img src="img/gallery/about-shape.png" alt="" />
      </div>
    </section>
  );
}

export default AboutPart;
