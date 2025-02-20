import Question from "./components/Question";

//API
import questionsData from "./api/questions.json";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  if (!questionsData) return <p>Loading question...</p>;

  return <Question questions={questionsData.questions} />;
}

export default App;
