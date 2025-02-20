import React, { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "./ToggleSwitch";

const QuestionContainer = styled.div<{ iscorrect: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.iscorrect
      ? "linear-gradient(180deg, #76E0C2 0%, #59CADA 100%)"
      : "linear-gradient(180deg, #f6b868 0%, #ee6b2d 100%)"};

  @media (max-width: 320px) {
    max-width: 320px;
    height: 631px;
  }
`;

const QuestionLabel = styled.h2`
  margin-bottom: 16px;
  font-family: Mulish;
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  letter-spacing: 0px;
  color: #ffffff;

  @media (max-width: 320px) {
    font-family: Mulish;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0px;
    text-align: center;
  }
`;

const ResultText = styled.p`
  ont-weight: 700;
  font-size: 32px;
  line-height: 44.8px;
  letter-spacing: 0px;
  color: #ffffff;

  @media (max-width: 320px) {
    font-weight: 700;
    font-size: 16px;
    line-height: 25.6px;
    letter-spacing: 0px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  min-width: 128px;
  font-weight: 700;
  font-size: 16px;
  height: 55px;
  border-radius: 5px;
  border: 2px solid white;
    background-color: ${(props) =>
      props.disabled ? "lightgrey" : "transparent"};
          cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
          opacity: ${(props) => (props.disabled ? 0.5 : 1)};  
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
     background-color: rgb(233, 170, 75);
  }

  @media (max-width: 320px) {
    font-weight: 700;
    font-size: 16px;
    height: 40px;
`;

interface ToggleSwitchItem {
  options: string[];
}

interface Question {
  label: string;
  answers: ToggleSwitchItem[];
  correctAnswers: string[];
}

interface QuestionProps {
  questions: Question[];
}

// Get random option that is not the correct answer
const getRandomOption = (options: string[], correctAnswer: string) => {
  const filteredOptions = options.filter((option) => option !== correctAnswer);
  return filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
};

// // This will suffle the answers array
// const shuffleAnswersOrder = (answers: ToggleSwitchItem[]) =>
//   answers.sort(() => Math.random() - 0.5);

const Question: React.FC<QuestionProps> = ({ questions }) => {
  // Get random question at inital render
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() =>
    Math.floor(Math.random() * questions.length)
  );
  // Get random option selected for each answers at initial render
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() =>
    questions[currentQuestionIndex].answers.map((s, index) =>
      getRandomOption(
        s.options,
        questions[currentQuestionIndex].correctAnswers[index]
      )
    )
  );
  // get previous question index
  const [previousQuestionIndexs, setPreviousQuestionIndexs] = useState<
    number[]
  >([]);

  const handleSwitchChange = (index: number, selected: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = selected;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    // Get random question when clicked on Next button
    const randomIndex = Math.floor(Math.random() * questions.length);
    console.log("randomIndex", randomIndex);
    setCurrentQuestionIndex(randomIndex);
    // shuffleAnswersOrder(questions[randomIndex].answers);
    setSelectedOptions(
      questions[randomIndex].answers.map((s, index) =>
        getRandomOption(s.options, questions[randomIndex].correctAnswers[index])
      )
    );
    // keep track of previous question
    setPreviousQuestionIndexs([
      ...previousQuestionIndexs,
      currentQuestionIndex
    ]);
  };

  const handlePrevious = () => {
    // keep track of previous question index.
    if (previousQuestionIndexs.length > 0) {
      const lastIndex =
        previousQuestionIndexs[previousQuestionIndexs.length - 1];
      // slice will make a copy of an array and removes that last index from the previousQuestionIndexs array.
      setPreviousQuestionIndexs((prev) => prev.slice(0, -1));
      setCurrentQuestionIndex(lastIndex);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // works if the order of the selected options is same as the correct answers.
  const isCorrect = selectedOptions.every(
    (option, index) => option === currentQuestion.correctAnswers[index]
  );

  return (
    <QuestionContainer iscorrect={isCorrect}>
      <QuestionLabel>{currentQuestion.label}</QuestionLabel>
      {currentQuestion.answers.map((answer, index) => (
        // When clicked on Next button, forcing a key update so that option is selected.
        // only index value will not update the ToogleSwitch component .
        <ToggleSwitch
          key={`${currentQuestionIndex}-${index}`}
          disabled={isCorrect}
          options={answer.options}
          onChange={(selected) => handleSwitchChange(index, selected)}
          initialSelected={selectedOptions[index]}
          isCorrect={isCorrect}
        />
      ))}
      <ResultText>
        {isCorrect ? "The answer is correct" : "The answer is incorrect"}
      </ResultText>
      <ButtonContainer>
        <Button
          onClick={handlePrevious}
          disabled={previousQuestionIndexs.length === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </ButtonContainer>
    </QuestionContainer>
  );
};

export default Question;
