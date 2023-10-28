import { Stack } from '@mui/material';
import React, { useState } from 'react';

const MultipleChoiceQuestion = ({ question, choices, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(question, event.target.value);
  };

  return (
    <div>
      <h3>{question}</h3>
      <Stack direction="row" spacing={2}>
      {
        choices.map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              value={choice}
              checked={selectedOption === choice}
              onChange={handleOptionChange}
            />
            {choice}
          </label>
        ))
      }
      </Stack>
    </div>
  );
};

export default MultipleChoiceQuestion;
