import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import axios from "axios";
import Header from "./components/Header";
import save from "./images/save.svg";
import vote from "./images/vote.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      description: [],
    };

    this.handleDescription = this.handleDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleDescription(titles) {
    const arr = [];
    titles.forEach((movie) => {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${movie.imdb_id}/`,
        headers: {
          "x-rapidapi-key":
            "c426a80468msh489383a1e8c815ap17e034jsn7fba12f2df64",
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => {
          arr.push(response.data[movie.title]);
          this.setState({ description: arr });
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  }

  handleSearch(e) {
    e.preventDefault();

    let title = document.getElementById("input");

    if (!title.value) {
      document.getElementById("emptyWarning").style.display = "block";
    } else {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title.value}/`,
        headers: {
          "x-rapidapi-key":
            "c426a80468msh489383a1e8c815ap17e034jsn7fba12f2df64",
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then((response) => {
          if (response.data.Result.length > 0) {
            this.setState({ titles: response.data.Result });
            this.handleDescription(this.state.titles);
          } else {
            alert("Please check your spelling and try again!");
          }
        })
        .catch(function (error) {
          alert(
            "The server is not working at this time, please try again later!",
            error.message
          );
        });

      document.getElementById("emptyWarning").style.display = "none";

      title.value = "";
    }
  }

  render() {
    return (
      <div className="container">
        <Header />
        <hr className="hr" />
        <SearchInput search={this.handleSearch} />
        <div>
          {this.state.description.map((movie) => {
            return (
              <div key={movie.imdb_id} className="moviesList">
                <hr className="hr" />
                <div className="topDescription">
                  <div>
                    <h1 className="topTitle">{movie.title}</h1>
                    <h4>
                      {movie.year} &nbsp;
                      {movie.gen[0].genre} &nbsp;
                      {movie.content_rating}
                    </h4>
                    <h5>running time {movie.movie_length}</h5>
                    <h5 className="topPlot">{movie.plot}</h5>
                    <iframe
                      className="trailer"
                      title={movie.title}
                      src={movie.trailer}
                    ></iframe>
                    <div className="saveAndVote">
                      <div className="topSave">
                        <img className="saveIcon" src={save} alt="save icon" />
                        <h5>Save</h5>
                      </div>
                      <div className="topVote">
                        <img className="saveIcon" src={vote} alt="save icon" />
                        <h5>Vote</h5>
                      </div>
                    </div>
                  </div>

                  <img
                    className="banner"
                    src={movie.banner}
                    alt="movie banner"
                  />
                </div>

                <p className="bottomDescription">{movie.description}</p>
                <div className="bottomFacts">
                  <h4>Popularity: {movie.popularity}</h4>
                  <h4>Release date: {movie.release}</h4>
                  <h4>Rating: {movie.rating}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
