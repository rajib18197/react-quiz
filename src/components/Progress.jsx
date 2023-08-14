import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
  const { index, numQuestions, answer, points, totalPoints } = useQuiz();

  return (
    <header className="progress">
      <progress
        value={index + Number(answer[index] !== undefined)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
