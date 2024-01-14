import React from 'react'
import OurTeam from '../team/Team'

function Team() {
  return (
    <div className="team-area pb-180">
            <div className="container">
                {/* <!-- Section Tittle --> */}
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-11 col-sm-11">
                        <div className="section-tittle text-center mb-100">
                            <h2>Profesyonel EKİBİMİZ</h2>
                        </div>
                    </div>
                </div>
                <OurTeam/>
            </div>
        </div>
  )
}

export default Team