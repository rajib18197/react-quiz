import { useQuiz } from "../contexts/QuizContext";

export default function Options() {
  const { questions, answer, index, dispatch } = useQuiz();

  const hasAnswered = answer[index] !== undefined;
  const question = questions[index];

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer[index] ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
