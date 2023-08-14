import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  useEffect(function () {
    const identifier = setInterval(() => {
      dispatch({ type: "updateRemaingTime" });
    }, 1000);

    return () => clearInterval(identifier);
  }, []);

  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
