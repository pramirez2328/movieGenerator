import React from "react";

function CounterMovies({ moviesNumber, condition }) {
  const s = moviesNumber === 1 ? "" : "s";
  const c = condition === "list" ? "There are " : "You have saved ";
  return (
    <h4 className="moviesCounter" style={{ color: "blue" }}>
      {c}
      {moviesNumber} movie{s}
    </h4>
  );
}

export default CounterMovies;
