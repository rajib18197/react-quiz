import { useQuiz } from "../contexts/QuizContext";

export default function NextQuestion() {
  const { index, numQuestions, answer, dispatch } = useQuiz();

  if (answer[index] === undefined) return null;
  console.log(index, numQuestions - 1);

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
}
