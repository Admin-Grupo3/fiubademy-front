import React, { useEffect, useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import styled from "styled-components";
import axios from 'axios';
import { getExams, sendExam } from '../../login/backend-api';


const MultipleChoiceForm = ({exams, courseId}) => {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleSelect = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };
  const handleClose = () => {
    window.location.href = "/"
  }
  const handleSubmit = async () => {
    // You can submit the answers or perform any further action here.
    const result = await sendExam(exams.exams[0].id, courseId, answers)
    console.log(result)
    setResults(result)
    setShowModal(true)
  };
  if (!exams) {
    return <div>Loading...</div>; // or return a loading spinner
  }

  const questions = exams.exams[0].questions;

  console.log(questions[0].question);
  return (
    <ChoiceWrapper>
        <Stack spacing={2}>
        {questions.map((question, index) => (
            <MultipleChoiceQuestion
            key={index}
            question={question.question}
            questionId = {question.id}
            choices={question.answers}
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
        
        {results  && (
  <pre>
    <Dialog open={showModal} onClose={handleClose}>
      <DialogTitle style={{fontSize: '40px'}}>Exam Results</DialogTitle>
      <DialogContent>
        <DialogContentText style={{fontSize: '30px'}}>
          {results && results.avgScore >= 0.6 ? "You passed the exam and got the certification!" : "You failed the exam!"}
        </DialogContentText>
        <DialogContentText style={{fontSize: '20px'}}>
          Score: {results && results.avgScore}
          <br />
          Correct Answers: 
          <ul>
              {results && Object.entries(results.correctAnswers).map(([questionId, answer], index) => (
                <li key={questionId}>{index + 1}) {answer}</li>
              ))}
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </pre>
)}
    </ChoiceWrapper>
  );
};
const ChoiceWrapper = styled.div`
  padding-left: 5rem;
`;
export default MultipleChoiceForm;
