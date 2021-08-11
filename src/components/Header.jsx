import banner1 from "../images/movieBanner.jpg";
import banner2 from "../images/movieBanner2.jpg";
import banner3 from "../images/movieBanner3.png";

function Header() {
  return (
    <header id="header">
      <div id="carousel">
        <div className="text-center">
          <h1 className="h1Title">Movie Reviews</h1>
          <hr className="hr" />

          <h4 className="listDescription">You'll find:</h4>
          <ul className="listDescription">
            <li>Popularity</li>
            <li>Reviews</li>
            <li>Year created</li>
            <li>Plot</li>
            <li>Release date, etc...</li>
          </ul>
        </div>

        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="item active">
              <img src={banner1} alt="Los Angeles" />
            </div>

            <div className="item">
              <img src={banner2} alt="Chicago" />
            </div>

            <div className="item">
              <img src={banner3} alt="New york" />
            </div>
          </div>

          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
