import "./QuizScreen.css";
import { nanoid } from "nanoid";
export default function Quetion(props) {
  const styles = {
    backgroundColor: props.isMarked ? "#D6DBF5" : "",
  };

  const buttonElement = props.ans.map((ans) => (
    <button
      className="btn-marked"
      onClick={(event) => {
        props.changeColor(event, props.id);
        props.changeMark(props.id);
      }}
    >
      {ans}
    </button>
  ));

  const question = props.decodeHtml(props.question);
  return (
    <div className="question">
      <h3>{question}</h3>
      <div className="options">{buttonElement}</div>
    </div>
  );
}
