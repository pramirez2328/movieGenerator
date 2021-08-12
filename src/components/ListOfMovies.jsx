import CounterMovies from "./CounterMovies";
import saveIcon from "../images/save.svg";
import liked from "../images/liked.svg";
import disliked from "../images/disliked.svg";

function ListOfMovies({ movies, save, likes }) {
  return (
    <div className="moviesList">
      {movies.length > 0 ? <CounterMovies moviesNumber={movies.length} /> : ""}
      {movies.map((movie) => {
        return (
          <div key={movie.imdb_id} className="list">
            <div className="topDescription">
              <div className="top">
                <h1 className="topTitle">{movie.title}</h1>
                <hr className="hr2" />
                <h5>
                  {movie.year} &nbsp;
                  {movie.gen[0].genre}
                  &nbsp;
                  {movie.content_rating}
                </h5>
                <h5>running time {movie.movie_length}</h5>
                <h5 className="topPlot">{movie.plot}</h5>
                <div className="saveAndVote">
                  <div className="topSave">
                    <img
                      className="saveIcon"
                      onClick={() => save(movie)}
                      src={saveIcon}
                      alt="save icon"
                    />
                    <h5>Save</h5>
                  </div>
                  <div className="likeIcons">
                    <img
                      className="likedIcon"
                      onClick={() => likes(movie, 1)}
                      src={liked}
                      alt="liked icon"
                    />
                    <h5 style={{ color: "blue" }}>
                      Popularity: {movie.popularity}
                    </h5>
                    <img
                      className="dislikedIcon"
                      onClick={() => likes(movie, -1)}
                      src={disliked}
                      alt="disliked icon"
                    />
                  </div>
                </div>
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
            <div className="bottomFacts">
              <h4>Release date: {movie.release}</h4>
              <h4>Rating: {movie.rating}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfMovies;
