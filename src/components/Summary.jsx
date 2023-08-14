import { useQuiz } from "../contexts/QuizContext";

export default function Summary() {
  const { numQuestions, questions, answer, totalPoints } = useQuiz();
  console.log(answer, questions[0].correctOption);
  const correctAnswer = answer.filter(
    (ans, i) => ans === questions[i].correctOption
  ).length;
  console.log(correctAnswer);

  return (
    <div>
      {questions.map((question, i) => {
        return (
          <div key={question.question}>
            <h4>
              <span>{question.correctOption === answer[i] ? "✅" : "❎"}</span>{" "}
              {question.question}
            </h4>
            <div className="options">
              {question.options.map((option, ind) => (
                <button
                  className={`btn btn-option ${
                    ind === question.correctOption &&
                    question.correctOption === answer[i]
                      ? "correct"
                      : ""
                  } ${
                    ind === answer[i] && answer[i] !== question.correctOption
                      ? "answer not-correct"
                      : ""
                  } ${ind === question.correctOption ? "correct" : ""}`}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <button className="btn btn-options">
        You come into <strong>{correctAnswer}</strong> correct answers out of{" "}
        <strong>{numQuestions} </strong>
        questions and Obtain <strong>{totalPoints}</strong> points.
      </button>
    </div>
  );
}
