import "./App.css";
import { useState, useEffect } from "react";
import FirstScreen from "./firstScreen/FirstScreen";
import QuizScreen from "./quizeScreen/QuizScreen";
import { nanoid } from "nanoid";
function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  function setTheStart() {
    setStart(!start);
  }
  //generating random ans from the ans array by combining the incorrect_answers and correct_answer
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  function generateRandomAns(ans) {
    let arr = [];
    while (arr.length < ans.length) {
      var r = Math.floor(Math.random() * 4);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    const newAns = arr.map((no) => decodeHtml(ans[no]));
    return newAns;
  }
  const getQuestions = async function () {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
      );
      const data = await res.json();

      setQuestions(() =>
        data.results.map((que) => ({
          ...que,
          isMarked: false,
          id: nanoid(),
          yourAns: "",
          ans: generateRandomAns([
            ...que.incorrect_answers,
            que.correct_answer,
          ]),
        }))
      );
    } catch (err) {
      console.log(err + "🌟🌟🌟🌟🌟🌟");
    }
  };
  function changeMark(id) {
    questions.forEach((que) =>
      que.id === id
        ? (que.isMarked = !que.isMarked)
        : (que.isMarked = que.isMarked)
    );
  }
  useEffect(
    function () {
      getQuestions();
    },
    [start]
  );

  return (
    <div className="App">
      <div className="container">
        {!start && <FirstScreen setTheStart={setTheStart} />}
        {start && (
          <QuizScreen
            questions={questions}
            changeMark={changeMark}
            setTheStart={setTheStart}
            decodeHtml={decodeHtml}
          />
        )}
      </div>
    </div>
  );
}

export default App;
