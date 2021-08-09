import React from "react";

function CounterMovies({ moviesNumber }) {
  return (
    <h4 className="moviesCounter" style={{ color: "blue" }}>
      {moviesNumber} MOVIES
    </h4>
  );
}

export default CounterMovies;
