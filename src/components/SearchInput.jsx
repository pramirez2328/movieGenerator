import React from "react";

function SearchInput({ search }) {
  return (
    <div id="inputDiv">
      <h6 id="emptyWarning">...enter a movie title!</h6>
      <form style={{ width: "75%" }}>
        <input type="text" id="input" required />
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
  );
}

export default SearchInput;
