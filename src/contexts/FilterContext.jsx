import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const initialState = {
  // selectedQuestions: [],
  questionsCount: 15,
  questionsType: [],
  // easy: 0,
  // medium: 0,
  // hard: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuestionsCount":
      return {};

    case "addQuestionsLevel":
      return {};

    default:
      throw new Error("Unknown Action!");
  }
}

function FilterProvider({ children }) {
  const [{ questionsCount, questionsType }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return <FilterContext.Provider>{children}</FilterContext.Provider>;
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error("Filter context was used outside of the Filter provider.");

  return context;
}

export default FilterProvider;
