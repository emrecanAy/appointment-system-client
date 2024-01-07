import React from 'react'

function Gallery() {
  return (
    <div className="gallery-area section-padding30">
    <div className="container">
        {/* <!-- Section Tittle --> */}
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-9 col-sm-10">
                <div className="section-tittle text-center mb-100">
                    <span>our image gellary</span>
                    <h2>some images from our barber shop</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="box snake mb-30">
                    <div className="gallery-img " ></div>
                    <div className="overlay"></div>
                </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-6">
                <div className="box snake mb-30">
                    <div className="gallery-img " ></div>
                    <div className="overlay"></div>
                </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-6">
                <div className="box snake mb-30">
                    <div className="gallery-img " ></div>
                    <div className="overlay"></div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="box snake mb-30">
                    <div className="gallery-img " ></div>
                    <div className="overlay"></div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Gallery