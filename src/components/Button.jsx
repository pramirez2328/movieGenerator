import React from "react";

function Button({ description, movieId }) {
  console.log(description);
  console.log(movieId);

  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        onClick={description(movieId)}
      >
        Show
      </button>
    </>
  );
}

export default Button;
