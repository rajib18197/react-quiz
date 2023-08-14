import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  return (
    <div className="start">
      <StarterBox />

      <StatsBox />

      <FilterBox />

      <ActionBox />
    </div>
  );
}

function StarterBox() {
  const { allQuestions, numEasy, numMedium, numHard, highScore, gameCount } =
    useQuiz();

  return (
    <div className="intro">
      <div className="welcome">
        {/* <img src="vite.svg" alt="React logo" /> */}
        <h2>Welcome to The on Board React Quiz!</h2>
        <h3>
          You have total {allQuestions.length} questions to test your React
          mastery.
        </h3>
      </div>
      {/* <div className="question-stats"> */}
      <div className="level">
        <span>Easy: {numEasy}</span>
        <span>Medium: {numMedium}</span>
        <span>Hard: {numHard}</span>
      </div>

      {gameCount >= 1 && (
        <div className="summary">
          <p>
            Highscore: <strong>{highScore}</strong>
          </p>
          <p>Played {gameCount} times so far.</p>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

function StatsBox() {
  const {
    questionsCount,
    numQuestions,
    questionsType,

    numEasy,
    numMedium,
    numHard,
  } = useQuiz();

  return (
    <div className="stats">
      {(questionsCount || questionsType.length !== 0) && (
        <h3>You have selected {numQuestions} questions for your next round.</h3>
      )}

      <div className="level">
        <span>Easy: {numEasy}</span>
        <span>Medium: {numMedium}</span>
        <span>Hard: {numHard}</span>
      </div>
    </div>
  );
}

function FilterBox() {
  const {
    numEasy,
    numMedium,
    numHard,
    numEasyQuestions,
    numMediumQuestions,
    numHardQuestions,
    questionsCount,
    numQuestions,
    questionsType,
    dispatch,
  } = useQuiz();

  const [value, setValue] = useState("");

  return (
    // <div className="controllers">
    <div className="filters">
      <div className="num-questions">
        <h4>Number of Questions</h4>
        <button
          className={`btn btn-select ${questionsCount === 5 ? "active" : ""}`}
          onClick={() => dispatch({ type: "numQuestionsChoice", payload: 5 })}
        >
          5
        </button>
        <button
          className={`btn btn-select ${questionsCount === 10 ? "active" : ""}`}
          onClick={() => dispatch({ type: "numQuestionsChoice", payload: 10 })}
        >
          10
        </button>
        <button
          className={`btn btn-select ${!questionsCount ? "active" : ""} ${
            questionsCount === 15 ? "active" : ""
          }`}
          onClick={() => dispatch({ type: "numQuestionsChoice", payload: 15 })}
        >
          15
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: "numQuestionsChoice",
              payload: Number(value),
            });
          }}
        >
          <input
            type="text"
            className="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>

      <div className="num-questions">
        <h4>Choose your level</h4>
        <div className="level-option">
          <button
            className="btn-inc"
            onClick={() => dispatch({ type: "countDec", payload: "easy" })}
          >
            -
          </button>

          <button
            className={`btn btn-select ${
              questionsType.includes("easy") ? "active" : ""
            }`}
            onClick={() =>
              dispatch({ type: "setQuestionsType", payload: "easy" })
            }
          >
            Easy ({numEasyQuestions}/{numEasy})
          </button>
          <button
            className="btn-inc"
            onClick={() => dispatch({ type: "countInc" })}
          >
            +
          </button>
        </div>
        <div className="level-option">
          <button className="btn-inc">-</button>

          <button
            className={`btn btn-select ${
              questionsType.includes("medium") ? "active" : ""
            }`}
            onClick={() =>
              dispatch({ type: "setQuestionsType", payload: "medium" })
            }
          >
            Medium ({numMediumQuestions}/{numMedium})
          </button>
          <button className="btn-inc">-</button>
        </div>
        <div className="level-option">
          <button className="btn-inc">-</button>

          <button
            className={`btn btn-select ${
              questionsType.includes("hard") ? "active" : ""
            }`}
            onClick={() =>
              dispatch({ type: "setQuestionsType", payload: "hard" })
            }
          >
            Hard ({numHardQuestions}/{numHard})
          </button>
          <button className="btn-inc">-</button>
        </div>
        <button
          className={`btn btn-select ${
            questionsType.length === 0 ? "active" : ""
          }`}
        >
          All ({numQuestions})
        </button>
      </div>
    </div>
    // </div>
  );
}

function ActionBox() {
  const { dispatch } = useQuiz();
  return (
    <div className="action">
      <p>Everything is Set!</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Let's Start the Mastery
      </button>
    </div>
  );
}
