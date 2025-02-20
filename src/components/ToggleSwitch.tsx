import React, { useState } from "react";
import styled from "styled-components";

interface ToogleSwitchSelectorProps {
  options: string[];
  onChange: (selected: string) => void;
  disabled: boolean;
  initialSelected?: string;
  isCorrect?: boolean;
}

const ToogleSwitchContainer = styled.div<{ iscorrect: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 900px;
  margin-bottom: 16px;
  border-radius: 100px;
  border: 1px solid white;

  @media (max-width: 320px) {
    width: 288px;
    min-height: 48px;
    top: 80px;
    left: 17px;
    border-radius: 30px;
    overflow: hidden;
  }
`;

const SwitchButton = styled.button<{ selected: boolean; iscorrect: boolean }>`
  flex-grow: 1;
  padding: 5px 10px;
  height: 80px;
  text-align: center;
  border: none;
  border-color: "e5e7eb";
  border-radius: 100px;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: none;
  font-size: 24px;
  background-color: ${(props) =>
    props.selected && props.iscorrect
      ? " #A5E7E2"
      : props.selected && !props.iscorrect
      ? " #F8CAA3"
      : "transparent"};
  color: ${(props) =>
    props.selected && props.iscorrect
      ? " #4CAD94"
      : props.selected && !props.iscorrect
      ? " #9F938B"
      : "white"};
  &:focus {
    outline: none;
  }

  @media (max-width: 320px) {
    font-size: 18px;
    height: 48px;
    max-width: 288px;
    letter-spacing: 0px;
  }
`;

const ToggleSwitch: React.FC<ToogleSwitchSelectorProps> = ({
  options,
  onChange,
  disabled = false,
  initialSelected = options[0],
  isCorrect = false
}) => {
  const [selected, setSelected] = useState<string>(initialSelected);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (!disabled) {
      onChange(option);
    }
  };

  return (
    <ToogleSwitchContainer iscorrect={isCorrect}>
      {options.map((option) => (
        <SwitchButton
          iscorrect={isCorrect}
          key={option}
          selected={selected === option}
          onClick={() => handleSelect(option)}
          disabled={disabled}
        >
          {option}
        </SwitchButton>
      ))}
    </ToogleSwitchContainer>
  );
};

export default ToggleSwitch;
