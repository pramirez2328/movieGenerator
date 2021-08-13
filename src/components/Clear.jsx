function Clear({ clear }) {
  return (
    <div>
      <button
        type="button"
        id="clear"
        className="btn btn-success"
        onClick={clear}
      >
        Clear
      </button>
    </div>
  );
}

export default Clear;
