import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import QuizContextProvider from "./contexts/QuizContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // </React.StrictMode>
  <QuizContextProvider>
    <App />
  </QuizContextProvider>
);
