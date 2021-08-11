import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import CounterMovies from "./components/CounterMovies";
import ListOfMovies from "./components/ListOfMovies";
import MySavedMovies from "./components/MySavedMovies";
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
      likedMovies: [],
    };

    this.handleDescription = this.handleDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
  }

  handleSave(movie) {
    this.setState((prevState) => ({
      savedMovies: [...prevState.savedMovies, movie],
    }));
  }

  handleLikes(movie, vote) {
    let temp = this.state.likedMovies.filter(
      (item) => item.imdb_id !== movie.imdb_id
    );
    movie.popularity += vote;
    let like = `you liked this movie on: ${today()}`;
    let disliked = `you disliked this movie on: ${today()}`;
    let messageVote = vote === 1 ? like : disliked;
    movie.message = messageVote;
    this.setState({
      likedMovies: [...temp, movie],
    });
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

    const title = document.getElementById("input");

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
    console.log(this.state.likedMovies);
    return (
      <div className="container">
        <Header />
        <hr className="hr" />
        <SearchInput search={this.handleSearch} />
        <MySavedMovies
          moviesSaved={this.state.savedMovies}
          likes={this.handleLikes}
        />
        {this.state.description.length > 0 ? (
          <CounterMovies moviesNumber={this.state.description.length} />
        ) : (
          ""
        )}
        <ListOfMovies
          movies={this.state.description}
          save={this.handleSave}
          likes={this.handleLikes}
        />
      </div>
    );
  }
}

export default App;
