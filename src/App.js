import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import axios from "axios";
import { div } from "prelude-ls";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      movieId: "",
      description: [],
    };

    this.movieDescription = this.movieDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  movieDescription(id, title) {
    const options = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,
      headers: {
        "x-rapidapi-key": "c426a80468msh489383a1e8c815ap17e034jsn7fba12f2df64",
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.setState({ description: [response.data[title]] });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  handleSearch(e) {
    e.preventDefault();

    let title = document.getElementById("input");
    const options = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title.value}/`,
      headers: {
        "x-rapidapi-key": "c426a80468msh489383a1e8c815ap17e034jsn7fba12f2df64",
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.setState({
          title: response.data.Result[0].title,
          movieId: response.data.Result[0].imdb_id,
        });
        this.movieDescription(
          response.data.Result[0].imdb_id,
          response.data.Result[0].title
        );
      })
      .catch(function (error) {
        console.error(error);
      });

    title.value = "";
  }

  render() {
    return (
      <div className="App">
        <SearchInput search={this.handleSearch} />
        <h1> {this.state.title}</h1>
        <h1> {this.state.movieId}</h1>
        {this.state.description.map((movie) => {
          return (
            <div key={this.state.movieId}>
              {<img src={`${movie["banner"]}`} alt="movie poster" />}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
