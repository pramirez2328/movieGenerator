import React from "react";

function SearchInput({ search }) {
  return (
    <div id="inputDiv">
      <h6 id="emptyWarning">...enter a movie title!</h6>
      <div id="inputId">
        <h3 id="appDescription">Enter a movie title: </h3>
        <form style={{ width: "75%" }}>
          <input
            type="text"
            id="input"
            style={{ borderRadius: "7px" }}
            required
          />
          <button
            id="inputButton"
            type="button"
            className="btn btn-primary"
            onClick={search}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
