import { Stack } from '@mui/material';
import React, { useState } from 'react';

const MultipleChoiceQuestion = ({ question,questionId ,choices, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(questionId, event.target.value);
  };

  return (
    <div>
      <h3>{question}</h3>
      <Stack direction="row" spacing={2}>
      {
        choices.map((choice, index) => (
          <label key={choice.id}>
            <input
              type="radio"
              value={choice.id}
              checked={selectedOption === choice.id}
              onChange={handleOptionChange}
            />
            {choice.answer}
          </label>
        ))
      }
      </Stack>
    </div>
  );
};

export default MultipleChoiceQuestion;
