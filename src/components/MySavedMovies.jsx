import CounterMovies from "./CounterMovies";

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
              <p>{movie.customReview}</p>
              <p>{movie.message}</p>
              <p>{movie.daySaved}</p>
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
