import React from 'react'

function Blog() {
  return (
    <section className="home-blog-area section-padding30">
    <div className="container">
        {/* <!-- Section Tittle --> */}
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10 col-sm-10">
                <div className="section-tittle text-center mb-90">
                    <span>our recent news</span>
                    <h2>Hipos and tricks from recent blog</h2>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                        <div className="blog-img">
                            <img src="img/gallery/home-blog1.png" alt=""/>
                            {/* <!-- Blog date --> */}
                            <div className="blog-date text-center">
                                <span>24</span>
                                <p>Now</p>
                            </div>
                        </div>
                        <div className="blog-cap">
                            <p>|   Physics</p>
                            <h3><a href="blog_details.html">Footprints in Time is perfect House in Kurashiki</a></h3>
                            <a href="blog_details.html" className="more-btn">became a member »</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="home-blog-single mb-30">
                    <div className="blog-img-cap">
                        <div className="blog-img">
                            <img src="img/gallery/home-blog2.png" alt=""/>
                            {/* <!-- Blog date --> */}
                            <div className="blog-date text-center">
                                <span>24</span>
                                <p>Now</p>
                            </div>
                        </div>
                        <div className="blog-cap">
                            <p>|   Physics</p>
                            <h3><a href="blog_details.html">Footprints in Time is perfect House in Kurashiki</a></h3>
                            <a href="blog_details.html" className="more-btn">became a member »</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Blog