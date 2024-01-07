import React from 'react'

function Team() {
  return (
    <div className="team-area pb-180">
            <div className="container">
                {/* <!-- Section Tittle --> */}
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-11 col-sm-11">
                        <div className="section-tittle text-center mb-100">
                            <span>Professional Teams</span>
                            <h2>Our award winner hair cut exparts for you</h2>
                        </div>
                    </div>
                </div>
                <div className="row team-active dot-style">
                    {/* <!-- single Tem --> */}
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                        <div className="single-team mb-80 text-center">
                            <div className="team-img">
                                <img src="img/gallery/team1.png" alt=""/>
                            </div>
                            <div className="team-caption">
                                <span>Master Barber</span>
                                <h3><a href="/">Guy C. Pulido bks</a></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                        <div className="single-team mb-80 text-center">
                            <div className="team-img">
                                <img src="img/gallery/team2.png" alt=""/>
                            </div>
                            <div className="team-caption">
                                <span>Color Expart</span>
                                <h3><a href="/">Steve L. Nolan</a></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                        <div className="single-team mb-80 text-center">
                            <div className="team-img">
                                <img src="img/gallery/team3.png" alt=""/>
                            </div>
                            <div className="team-caption">
                                <span>Master Barber</span>
                                <h3><a href="/">Edgar P. Mathis</a></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
                        <div className="single-team mb-80 text-center">
                            <div className="team-img">
                                <img src="img/gallery/team2.png" alt=""/>
                            </div>
                            <div className="team-caption">
                                <span>Master Barber</span>
                                <h3><a href="/">Edgar P. Mathis</a></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Team