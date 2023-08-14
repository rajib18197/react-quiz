import { createContext, useContext, useEffect, useReducer } from "react";

function getFilterQuestions(questions, questionsCount, questionsType, payload) {
  console.log(questions, questionsCount, questionsType, payload);
  let filterQuestions = [...questions];
  let newQuestions = [];

  if (questionsType.length === 0) {
    newQuestions = questions.filter((_, i) => i < (payload || questionsCount));
  }

  while (newQuestions.length < questionsCount) {
    let flag = false;

    if (questionsType.includes("easy") || payload === "easy") {
      const arr = filterQuestions.findIndex((q) => q.points <= 10);

      if (arr !== -1 && newQuestions.length < questionsCount) {
        newQuestions.push(filterQuestions.find((q) => q.points <= 10));
        filterQuestions.splice(arr, 1);
      }

      if (arr !== -1) flag = true;
    }

    if (questionsType.includes("medium") || payload === "medium") {
      const arr = filterQuestions.findIndex(
        (q) => q.points > 10 && q.points <= 20
      );

      if (arr !== -1 && newQuestions.length < questionsCount) {
        console.log(2222222);
        newQuestions.push(
          filterQuestions.find((q) => q.points > 10 && q.points <= 20)
        );
        filterQuestions.splice(arr, 1);
      }

      if (arr !== -1) flag = true;
    }

    if (questionsType.includes("hard") || payload === "hard") {
      const arr = filterQuestions.findIndex(
        (q) => q.points > 20 && q.points <= 30
      );

      if (arr !== -1 && newQuestions.length < questionsCount) {
        newQuestions.push(
          filterQuestions.find((q) => q.points > 20 && q.points <= 30)
        );
        filterQuestions.splice(arr, 1);
      }

      if (arr !== -1) flag = true;
    }

    if (!flag) break;
  }

  console.log(newQuestions);
  return newQuestions;
}

const QuizContext = createContext();

const initialState = {
  questions: [],
  selectedQuestions: [],
  questionsCount: 15,
  questionsType: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: null,
  answer: [],
  points: 0,
  highScore: null,
  secondsRemaining: null,
  gameCount: 0,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "error":
      return { ...state, status: "error" };

    case "numQuestionsChoice":
      const random = [];
      state.questions.forEach((el, i, arr) => {
        if (random.length === action.payload) return;

        let r = Math.trunc(Math.random() * arr.length);
        while (
          random
            .map((el) => el.question.toLowerCase())
            .includes(arr[r].question.toLowerCase())
        ) {
          r = Math.trunc(Math.random() * arr.length);
        }

        random.push(arr[r]);
      });

      console.log(random);

      return {
        ...state,
        questionsCount: action.payload,
        selectedQuestions: random,
      };

    case "setQuestionsType":
      return {
        ...state,
        questionsType: [...state.questionsType, action.payload],
      };

    case "countInc":
      return {
        ...state,
      };

    case "countDec":
      console.log(1);
      return {
        ...state,
        [action.payload]: state[action.payload] - 1,
      };

    case "setTypeCount":
      return {
        ...state,
        easy: action.payload.easy,
        medium: action.payload.medium,
        hard: action.payload.hard,
      };

    case "startQuiz":
      return { ...state, status: "active", index: 0 };

    case "newAnswer":
      const question =
        state.selectedQuestions.length !== 0
          ? state.selectedQuestions[state.index]
          : state.questions[state.index];

      return {
        ...state,
        answer: [...state.answer, action.payload],
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1 };

    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        gameCount: state.gameCount + 1,
      };

    default:
      throw new Error("Unknown action types!");
  }
}

const API_URL = "https://react-quiz-umi6.onrender.com";

export default function QuizContextProvider({ children }) {
  // prettier-ignore
  const [{questions: allQuestions, selectedQuestions, questionsCount, questionsType, status, index, answer, points, highScore, secondsRemaining, gameCount}, dispatch] = useReducer(reducer, initialState);

  const numEasy = allQuestions.filter(
    (question) => question.points <= 10
  ).length;
  const numMedium = allQuestions.filter(
    (question) => question.points > 10 && question.points <= 20
  ).length;
  const numHard = allQuestions.filter(
    (question) => question.points > 20 && question.points <= 30
  ).length;

  let questions =
    selectedQuestions.length === 0 ? allQuestions : selectedQuestions;
  console.log(questions);

  const levelWiseQuestions = questions.filter((question) => {
    const easy = question.points <= 10 && "easy";
    const medium = question.points > 10 && question.points <= 20 && "medium";
    const hard = question.points > 20 && question.points <= 30 && "hard";

    if (questionsType.includes(easy)) {
      return true;
    }
    if (questionsType.includes(medium)) {
      return true;
    }
    if (questionsType.includes(hard)) {
      return true;
    }
  });

  questions = levelWiseQuestions.length === 0 ? questions : levelWiseQuestions;
  console.log(questions);

  const numEasyQuestions = questions.filter(
    (question) => question.points <= 10
  ).length;
  const numMediumQuestions = questions.filter(
    (question) => question.points > 10 && question.points <= 20
  ).length;
  const numHardQuestions = questions.filter(
    (question) => question.points > 20 && question.points <= 30
  ).length;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const response = await fetch(`${API_URL}/questions`);
        if (!response.ok) throw new Error("Could not load questions!");

        const data = await response.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }

    fetchQuestions();
  }, []);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  // prettier-ignore
  const value = {allQuestions, numEasyQuestions, numMediumQuestions, numHardQuestions, questions, questionsCount, numEasy, numMedium, numHard, questionsType, status, index, answer, points, highScore, secondsRemaining, gameCount, numQuestions, totalPoints, dispatch}

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz Context was used outside of the Quiz provider!");
  return context;
}
