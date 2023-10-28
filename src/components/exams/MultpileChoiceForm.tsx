import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import { Button, Stack } from '@mui/material';
import styled from "styled-components";
const questions = [
    {
      question: 'What is this  1 ',
      choices: ['Option A', 'Option B', 'Option C'],
    },
    {
      question: 'Question 2',
      choices: ['Option X', 'Option Y', 'Option Z'],
    },
    // Add more questions as needed
  ];
const MultipleChoiceForm = () => {
  const [answers, setAnswers] = useState({});

  const handleSelect = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  const handleSubmit = () => {
    // You can submit the answers or perform any further action here.
    console.log('Submitted Answers:', answers);
  };

  return (
    <ChoiceWrapper>
        <Stack spacing={2}>
        {questions.map((question, index) => (
            <MultipleChoiceQuestion
            key={index}
            question={question.question}
            choices={question.choices}
            onSelect={handleSelect}
            />
        ))}
        
        </Stack>
        <Button
            onClick={handleSubmit}
            style={{marginLeft: '20px', height: '40px'}}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Envia Respuestas
        </Button> 
    </ChoiceWrapper>
  );
};
const ChoiceWrapper = styled.div`
  padding-left: 5rem;
`;
export default MultipleChoiceForm;
