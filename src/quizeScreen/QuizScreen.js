import "./QuizScreen.css";
import Question from "./Question";
import { useEffect, useState } from "react";

export default function (props) {
  //counting correct ans using state
  const [correct, setCorrect] = useState(0);
  //checking if the check answer button is clicked or not using state
  const [showCorrect, setShowCorrect] = useState(true);
  //create questions
  const questionElement = props.questions.map((que) => {
    return (
      <Question
        key={que.id}
        ans={que.ans}
        correct_answer={que.correct_answer}
        question={que.question}
        id={que.id}
        isMarked={que.isMarked}
        changeColor={changeColor}
        changeMark={props.changeMark}
        decodeHtml={props.decodeHtml}
      />
    );
  });
  //changing background color when any option is clicked
  function changeColor(event, id) {
    event.target.parentElement.childNodes.forEach((child) => {
      child.style.backgroundColor = "";
      child.style.border = "1.5px solid #293264";
    });

    if (event.target.classList.contains("btn-marked")) {
      event.target.style.backgroundColor = "#D6DBF5";
      event.target.style.border = "none";
      props.questions.forEach((que) =>
        que.id === id ? (que.yourAns = event.target.textContent) : "None"
      );
    }
  }

  //checking correct answers
  function checkCorrect() {
    props.questions.forEach((que) => {
      if (que.correct_answer === que.yourAns && que.yourAns !== "")
        setCorrect((preCorrect) => preCorrect + 1);
    });
    setShowCorrect(false);
  }
  useEffect(function () {
    document
      .querySelector(".options")
      .removeEventListener("click", changeColor);
  }, []);

  return (
    <div className="quiz-questions">
      {questionElement}
      {/* conditionally rendering the check button and the correct answers */}

      {showCorrect ? (
        <button className="btn-check" onClick={checkCorrect}>
          Check Answer
        </button>
      ) : (
        <div className="ans">
          <p className="show-correct-ans">
            You scored {correct}/5 correct answers
          </p>
          <button className="btn-check" onClick={props.setTheStart}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
