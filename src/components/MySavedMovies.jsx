import CounterMovies from "./CounterMovies";
import popcorn from "../images/popcorn.jpg";

function MySavedMovies({ moviesSaved, likes }) {
  return (
    <div className="showMovies">
      {moviesSaved.length > 0 ? (
        <CounterMovies moviesNumber={moviesSaved.length} condition="saved" />
      ) : (
        ""
      )}
      {moviesSaved.map((movie) => {
        return (
          <div key={movie.imdb_id} className="list">
            <div className="topDescription">
              <div className="top">
                <h1 className="topTitle">{movie.title}</h1>
                <hr className="hr2" />
                <h5 style={{ color: "blue" }}>
                  {movie.year} &nbsp;
                  {movie.gen[0].genre}
                  &nbsp;
                  {movie.content_rating} &nbsp; Popularity: {movie.popularity}
                </h5>
                <h5>running time {movie.movie_length}</h5>
                <h5 className="topPlot">{movie.plot}</h5>
                <iframe
                  className="trailer"
                  title={movie.title}
                  src={movie.trailer}
                  allow="fullscreen"
                ></iframe>
              </div>

              <img className="banner" src={movie.banner} alt="movie banner" />
            </div>

            <p className="bottomDescription">{movie.description}</p>

            <div className="movieReviews">
              <img
                src={popcorn}
                alt="icon gif"
                style={{
                  width: "25%",
                  marginRight: "1em",
                  borderRadius: "5px",
                }}
              />
              <ul className="ulReviews">
                <li>
                  <span className="outputReviews">Review:</span>{" "}
                  {movie.customReview}
                </li>
                <li>
                  <span className="outputReviews">Like:</span> {movie.message}
                </li>
                <li>
                  <span className="outputReviews">Saved:</span> {movie.daySaved}
                </li>
              </ul>
            </div>

            <div className="bottomFacts">
              <h4>Release date: {movie.release}</h4>
              <h4> Popularity: {movie.popularity}</h4>
              <h4>Rating: {movie.rating}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MySavedMovies;
