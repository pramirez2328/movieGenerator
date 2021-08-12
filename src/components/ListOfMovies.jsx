import CounterMovies from "./CounterMovies";
import saveIcon from "../images/save.svg";
import liked from "../images/liked.svg";
import disliked from "../images/disliked.svg";
import love from "../images/love.svg";
import angry from "../images/angry.svg";

function ListOfMovies({ movies, save, likes }) {
  return (
    <div className="moviesList">
      {movies.length > 0 ? (
        <CounterMovies moviesNumber={movies.length} condition="list" />
      ) : (
        ""
      )}
      {movies.map((movie) => {
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

            <div className="story">
              <label htmlFor="story">What is your review:</label>

              <textarea
                id={movie.imdb_id + "story"}
                name="story"
                rows="5"
                cols="3"
                placeholder=" This movie is one of the most ... "
              ></textarea>
            </div>
            <div className="saveAndVote">
              <div id={movie.imdb_id + "likedIcon"} className="likeIcons">
                <img
                  className="likedIcon"
                  onClick={() => likes(movie, 1)}
                  src={liked}
                  alt="liked icon"
                />

                <img
                  className="dislikedIcon"
                  onClick={() => likes(movie, -1)}
                  src={disliked}
                  alt="disliked icon"
                />
              </div>

              <img
                src={love}
                id={movie.imdb_id + "love"}
                className="emotionsIcons"
                alt="love icon"
                style={{ display: "none" }}
              />
              <img
                src={angry}
                id={movie.imdb_id + "angry"}
                className="emotionsIcons"
                alt="love icon"
                style={{ display: "none" }}
              />

              <div id={movie.imdb_id + "topSave"} className="savedDiv">
                <button className="saveIcon" onClick={() => save(movie)}>
                  <img src={saveIcon} alt="save icon" />
                  Save
                </button>
              </div>
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

export default ListOfMovies;
