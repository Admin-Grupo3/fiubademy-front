import { Box, Button, Stack, TextField } from '@mui/material';
import { create } from 'axios';
import React, { useState } from 'react';
import { createExam } from '../../login/backend-api';
import { useParams } from 'react-router-dom';


const QuestionCreationForm = ( {
    formData = {
        title: '',
        questions: [],
    },
    setFormData
}) => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerChoices, setAnswerChoices] = useState([]);

    const addAnswerChoice = () => {
        if (answer.trim() === '') return;

        setAnswerChoices([...answerChoices, answer]);
        setAnswer('');
    };
    

    const handleQuestionAdd = (newQuestion) => {
        const updatedQuestions = [...formData.questions, newQuestion];
        setFormData({ title, questions: updatedQuestions });
        console.log(formData)
        console.log(newQuestion)
    };
    const addQuestion = () => {
        if (question.trim() === '' || answerChoices.length < 2) return;

        handleQuestionAdd({ question, answers: answerChoices, correctAnswer: answerChoices[0] });
        setQuestion('');
        setAnswer('');
        setAnswerChoices([]);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(formData.questions.length > 0){
            createExam(title, id, formData.questions)
        }
      
    };
    return (
        <div>
            <h2>Create Multiple-Choice Questions</h2>
            <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            autoComplete="off"
            noValidate
            >
                <Stack spacing={2}>
                <TextField
                    required
                    id="outlined-required"
                    label="Enter the exam name"
                    onChange={(e) => setTitle(e.target.value)}
                    error={title.trim() === '' }
                    helperText={
                        question.trim() === '' || answerChoices.length < 2
                        ? "Este campo es requerido"
                        : ""
                    }
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Enter the question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    error={(question.trim() === '' && answerChoices.length < 2) && formData.questions.length < 1}
                    helperText={
                        question.trim() === '' || answerChoices.length < 2
                        ? "Este campo es requerido y debes tener 2 opciones"
                        : ""
                    }
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Enter a choice"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    error={answer.trim() === '' && answerChoices.length < 2 && formData.questions.length < 1}
                    helperText={
                        answer.trim() === ''
                        ? "Este campo es requerido"
                        : ""
                    }
                    />
                    <Stack direction="row" spacing={2}>
                    {
                    answerChoices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                    ))}
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addAnswerChoice}
                >
                Add answer choice
                </Button>
            
                <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addQuestion}
                >
                Agregar pregunta
                </Button>
                </Stack>
                
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Crear examen
                </Button>
        </Box>
        <h2>Questions</h2>
        {formData.questions.map((question, index) => (
             <li key={index}>{question.question}</li>
            ))}
        </div>
    );
};

export default QuestionCreationForm;
