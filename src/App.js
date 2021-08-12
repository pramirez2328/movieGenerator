import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import ListOfMovies from "./components/ListOfMovies";
import MySavedMovies from "./components/MySavedMovies";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import today from "./today";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      description: [],
      savedMovies: [],
    };

    this.handleDescription = this.handleDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
    this.handleShowSavedMovies = this.handleShowSavedMovies.bind(this);
  }

  handleShowSavedMovies() {
    let showMovie = document.getElementsByClassName("showMovies");
    let movies = document.querySelectorAll(".moviesList");
    for (let i = 0; i < showMovie.length; i++) {
      showMovie[i].style.display = "block";
    }
    for (let i = 0; i < movies.length; i++) {
      movies[i].style.display = "none";
    }
  }

  handleSave(movie) {
    const temp = this.state.savedMovies.filter((item) => {
      return item.imdb_id !== movie.imdb_id;
    });

    const textArea = document.getElementById(`${movie.imdb_id}story`).value;

    movie.customReview = textArea;
    movie.daySaved = `movie was saved on ${today()}`;

    document.querySelector(
      `#${movie.imdb_id}topSave`
    ).innerText = `movie was saved on ${today()}`;

    this.setState({
      savedMovies: [...temp, movie],
    });
  }

  handleLikes(movie, vote) {
    let temp = this.state.description.filter(
      (item) => item.imdb_id !== movie.imdb_id
    );
    movie.popularity += vote;

    let like = `you liked this movie `;
    let disliked = `you disliked this movie `;
    let messageVote = vote === 1 ? like : disliked;
    movie.message = messageVote;

    if (vote === 1) {
      document.querySelector(`#${movie.imdb_id}love`).style.display = "block";
    } else {
      document.querySelector(`#${movie.imdb_id}angry`).style.display = "block";
    }

    this.setState({
      savedMovies: [...temp, movie],
    });

    document.querySelector(`#${movie.imdb_id}likedIcon`).innerText =
      messageVote;
  }

  handleDescription(titles) {
    const arr = [];
    titles.forEach((movie) => {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${movie.imdb_id}/`,
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
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

    const title = document.getElementById("input");

    if (!title.value) {
      document.getElementById("emptyWarning").style.display = "block";
    } else {
      const options = {
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title.value}/`,
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
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

      let showMovie = document.getElementsByClassName("showMovies");
      for (let i = 0; i < showMovie.length; i++) {
        showMovie[i].style.display = "none";
      }

      let movies = document.querySelectorAll(".moviesList");
      for (let i = 0; i < movies.length; i++) {
        movies[i].style.display = "block";
      }

      title.value = "";
    }
  }

  render() {
    return (
      <div className="container">
        <Header showSavedMovies={this.handleShowSavedMovies} />
        <hr className="hr" />
        <SearchInput search={this.handleSearch} />
        <MySavedMovies
          moviesSaved={this.state.savedMovies}
          likes={this.handleLikes}
        />
        <ListOfMovies
          movies={this.state.description}
          save={this.handleSave}
          likes={this.handleLikes}
        />

        {this.state.titles.length === 0 ? "" : <BackToTop />}
      </div>
    );
  }
}

export default App;
