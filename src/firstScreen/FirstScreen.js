import "./FirstScreen.css";
export default function FirstScreen(props) {
  return (
    <div className="first-page">
      <h2 className="heading">Quizzical</h2>
      <p className="description">
        This is quiz game created for fun . Hope You Like it
      </p>
      <button className="btn" onClick={props.setTheStart}>
        Start quiz
      </button>
    </div>
  );
}
