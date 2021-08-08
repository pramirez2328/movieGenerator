import React, { Component } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import axios from "axios";
import Header from "./components/Header";
import Button from "./components/Button";

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

  handleDescription(id) {
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
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
        <ol>
          {this.state.titles.map((movie) => {
            return (
              <li key={movie.imdb_id} className="moviesList">
                {movie.title}
                <span className="spanButton">
                  <Button
                    description={this.handleDescription}
                    movieId={movie.imdb_id}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default App;
