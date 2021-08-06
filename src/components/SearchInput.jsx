import React from "react";

function SearchInput({ search }) {
  return (
    <div>
      <input type="text" id="input" required />
      <button onClick={search}>Search</button>
    </div>
  );
}

export default SearchInput;
