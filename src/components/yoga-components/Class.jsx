import React from "react";

function Class() {
  return (
    <div className="class">
      <div className="container">
        <div
          className="section-header text-center wow zoomIn"
          data-wow-delay="0.1s"
        >
          <p>Our Classes</p>
          <h2>Yoga Class Shedule</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <ul id="class-filter">
              <li data-filter="*" className="filter-active">
                All Classes
              </li>
              <li data-filter=".filter-1">Pilates Yoga</li>
              <li data-filter=".filter-2">Hatha Yoga</li>
              <li data-filter=".filter-3">Vinyasa yoga</li>
            </ul>
          </div>
        </div>
        <div className="row class-container">
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp"
            data-wow-delay="0.0s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-1.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-1.png" alt="Image" />
                  <h3>Elise Moran</h3>
                  <a href>+</a>
                </div>
                <h2>Pilates Yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-2 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-2.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-2.png" alt="Image" />
                  <h3>Kate Glover</h3>
                  <a href>+</a>
                </div>
                <h2>Iyengar Yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-3 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-3.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-3.png" alt="Image" />
                  <h3>Elina Ekman</h3>
                  <a href>+</a>
                </div>
                <h2>Ashtanga yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-4.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-4.png" alt="Image" />
                  <h3>Lilly Fry</h3>
                  <a href>+</a>
                </div>
                <h2>Hatha Yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-2 wow fadeInUp"
            data-wow-delay="0.8s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-5.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-5.png" alt="Image" />
                  <h3>Olivia Yates</h3>
                  <a href>+</a>
                </div>
                <h2>Kundalini Yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 col-sm-12 class-item filter-3 wow fadeInUp"
            data-wow-delay="1s"
          >
            <div className="class-wrap">
              <div className="class-img">
                <img src="img/class-6.jpg" alt="Image" />
              </div>
              <div className="class-text">
                <div className="class-teacher">
                  <img src="img/teacher-6.png" alt="Image" />
                  <h3>Millie Harper</h3>
                  <a href>+</a>
                </div>
                <h2>Vinyasa yoga</h2>
                <div className="class-meta">
                  <p>
                    <i className="far fa-calendar-alt" />
                    Sun, Tue, Thu
                  </p>
                  <p>
                    <i className="far fa-clock" />
                    9:00 - 10:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;
