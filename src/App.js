import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import axios from "axios";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
      description: [],
    };

    this.movieDescription = this.movieDescription.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  movieDescription(id, title) {
    // const options = {
    //   method: "GET",
    //   url: `https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,
    //   headers: {
    //     "x-rapidapi-key": "c426a80468msh489383a1e8c815ap17e034jsn7fba12f2df64",
    //     "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
    //   },
    // };
    // axios
    //   .request(options)
    //   .then((response) => {
    //     this.setState({ description: [response.data[title]] });
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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
        this.setState({ titles: response.data.Result });
      })
      .catch(function (error) {
        console.error(error);
      });

    title.value = "";
  }

  render() {
    return (
      <div className="container">
        <Header />
        <SearchInput search={this.handleSearch} />
        <ul>
          {this.state.titles.map((movie) => {
            return <li key={movie.imdb_id}>{movie.title} </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
