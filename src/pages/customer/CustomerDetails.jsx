import React from 'react'

function CustomerDetails({customer}) {
  customer.imagePath = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
  return (
    <section className="about-area section-padding30 position-relative">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-11">
                {/* <!-- about-img --> */}
                <div className="about-img ">
                  <img src={customer.imagePath} alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="about-caption">
                  {/* <!-- Section Tittle --> */}
                  <div className="section-tittle section-tittle3 mb-35">
                    <span>@{customer.userName}</span>
                    <h2>{customer.firstName} {customer.lastName}</h2>
                  </div>
                  <p className="mb-30 pera-bottom">
                  Güncel saç trendlerini takip eden, özgün ve modern saç tasarımları yapan bir kuaförüm. Müşterilerime özel saç kesimi, renklendirme ve şekillendirme hizmetleri sunarak onların benzersiz tarzlarını ortaya çıkarıyorum. Yaratıcı ve müşteri odaklı bir yaklaşımla herkesi memnuniyetle karşılıyorum.
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
  )
}

export default CustomerDetails