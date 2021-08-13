import searchIcon from "../images/search.svg";
import Clear from "../components/Clear.jsx";

function SearchInput({ search, clear }) {
  return (
    <div id="inputDiv">
      <h6 id="emptyWarning">...enter a movie title!</h6>
      <div id="inputId">
        <div id="inputInner">
          <h3 id="appDescription">Enter a movie title: </h3>
          <form onKeyDown={search}>
            <input type="text" id="input" spellCheck="false" />
            <img id="searchIcon" src={searchIcon} alt="search icon" />
          </form>
        </div>

        <Clear clear={clear} />
      </div>
    </div>
  );
}

export default SearchInput;
