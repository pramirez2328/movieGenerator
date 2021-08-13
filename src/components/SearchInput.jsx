import searchIcon from "../images/search.svg";

function SearchInput({ search }) {
  return (
    <div id="inputDiv">
      <h6 id="emptyWarning">...enter a movie title!</h6>
      <div id="inputId">
        <h3 id="appDescription">Enter a movie title: </h3>
        <form onKeyDown={search}>
          <input type="text" id="input" required />
          <img id="searchIcon" src={searchIcon} alt="search icon" />
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
