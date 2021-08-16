import up from "../images/up.svg";
function BackToTop() {
  return (
    <div>
      <a href="#top" id="topAnchor">
        <img src={up} alt="up icon" />
        <p>
          <span id="backTo">back to</span> top
        </p>
      </a>
    </div>
  );
}

export default BackToTop;
