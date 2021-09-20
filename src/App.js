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
      anchorTag: false,
    };

    this.handleDescription = this.handleDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
    this.handleShowSavedMovies = this.handleShowSavedMovies.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const preSaved = localStorage.getItem("savedMovies");
    if (preSaved !== null) {
      this.setState({ savedMovies: JSON.parse(preSaved) });
    }
  }

  componentDidUpdate() {
    return localStorage.setItem(
      "savedMovies",
      JSON.stringify(this.state.savedMovies)
    );
  }

  handleClear() {
    this.setState({ titles: [], description: [], anchorTag: false });
    let showMovie = document.getElementsByClassName("showMovies");
    for (let i = 0; i < showMovie.length; i++) {
      showMovie[i].style.display = "none";
    }
  }

  handleDelete(id) {
    let remainingMovies = this.state.savedMovies.filter(
      (movie) => movie.imdb_id !== id
    );
    let temp = remainingMovies.length === 0 ? false : true;
    this.setState({ savedMovies: remainingMovies, anchorTag: temp });
  }

  handleShowSavedMovies() {
    let showMovie = document.getElementsByClassName("showMovies");

    if (this.state.savedMovies.length === 0) {
      document.getElementById("noMovieSaved").style.display = "block";
    }

    let movies = document.querySelectorAll(".moviesList");
    for (let i = 0; i < showMovie.length; i++) {
      showMovie[i].style.display = "block";
    }
    for (let i = 0; i < movies.length; i++) {
      movies[i].style.display = "none";
    }

    let temp = this.state.savedMovies.length === 0 ? false : true;
    this.setState({ titles: [], description: [], anchorTag: temp });
  }

  handleSave(movie) {
    let temp = this.state.savedMovies.filter(
      (item) => item.imdb_id !== movie.imdb_id
    );
    let textArea = document.getElementById(`${movie.imdb_id}story`).value;

    if (textArea === "") {
      textArea = "You did not write any review for this movie!";
    }
    movie.customReview = textArea;
    movie.daySaved = `movie was saved on ${today()}`;

    document.querySelector(
      `#${movie.imdb_id}topSave`
    ).innerText = `movie was saved on ${today()}`;

    if (!movie.message) {
      movie.message = "You did not vote this movie";
    }
    temp.push(movie);
    this.setState({
      savedMovies: temp,
    });
  }

  handleLikes(movie, vote) {
    movie.popularity += vote;
    let like = `you liked this movie `;
    let disliked = `you disliked this movie `;
    let messageVote = vote === 1 ? like : disliked;

    movie.message = messageVote;
    document.querySelector(`#${movie.imdb_id}likedIcon`).innerText =
      messageVote;

    if (vote === 1) {
      document.querySelector(`#${movie.imdb_id}love`).style.display = "block";
    } else {
      document.querySelector(`#${movie.imdb_id}angry`).style.display = "block";
    }
  }

  handleDescription(titles) {
    const arr = [];
    titles.forEach((movie) => {
      const options = {
        credentials: "include",
        method: "GET",
        url: `https://data-imdb1.p.rapidapi.com/movie/id/${movie.imdb_id}/`,
        headers: {
          // "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-key":
            "36f8e3d5c8mshd5ca2515c026760p150c4bjsn3d5f1a474903",
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => {
          arr.push(response.data[movie.title]);
          console.log(response);
          this.setState({ description: arr, anchorTag: true });
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  }

  handleSearch(e) {
    if (e.which === 13) {
      e.preventDefault();

      const title = document.getElementById("input");
      document.getElementById("noMovieSaved").style.display = "none";

      if (!title.value) {
        document.getElementById("emptyWarning").style.display = "block";
      } else {
        const options = {
          credentials: "include",
          method: "GET",
          url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title.value}/`,
          headers: {
            // "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-key":
              "36f8e3d5c8mshd5ca2515c026760p150c4bjsn3d5f1a474903",
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          },
        };

        axios
          .request(options)
          .then((response) => {
            if (response.data.Result.length > 0) {
              console.log(response);
              this.setState({ titles: response.data.Result });
              this.handleDescription(this.state.titles);
            } else {
              alert("Please check your spelling and try again!");
            }
          })
          .catch(function (error) {
            console.log(error.message);
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
  }

  render() {
    return (
      <div className="container">
        <Header showSavedMovies={this.handleShowSavedMovies} />
        <hr className="hr" />
        <SearchInput search={this.handleSearch} clear={this.handleClear} />

        <MySavedMovies
          moviesSaved={this.state.savedMovies}
          deleteMovie={this.handleDelete}
        />
        <ListOfMovies
          movies={this.state.description}
          save={this.handleSave}
          likes={this.handleLikes}
        />

        {this.state.anchorTag ? <BackToTop /> : ""}
      </div>
    );
  }
}

export default App;
