import React from "react";

function SearchInput({ search }) {
  return (
    <div id="inputDiv">
      <div style={{ width: "75%" }}>
        <input type="text" id="input" required />
        <button
          id="inputButton"
          type="button"
          className="btn btn-primary"
          onClick={search}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
