import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import Summary from "./Summary";

export default function FinishScreen() {
  const [showQuiz, setShowQuiz] = useState(false);

  const { points, totalPoints, highScore, dispatch, answer } = useQuiz();

  return (
    <div>
      <p className="result">
        You scored {points} out of {totalPoints}(33%)
      </p>
      <p className="highscore">Highscore: {highScore}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
        <button
          className="btn btn-ui"
          onClick={() => setShowQuiz((quiz) => !quiz)}
        >
          {showQuiz ? "close answers" : "Open answers"}
        </button>
      </div>

      {showQuiz && <Summary />}
    </div>
  );
}
