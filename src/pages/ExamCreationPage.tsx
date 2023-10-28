import styled from "styled-components";
import MultipleChoiceForm from "../components/exams/MultpileChoiceForm"
import { Grid, Stack } from "@mui/material";
import QuestionCreationForm from "../components/exams/QuestionCreationForm";
import { useState } from "react";

const ExamCreationPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        questions: [],
    });
    return (
        <ExamsCreationWrapper>
            <h1 className="title">Createing a new exam</h1>
            <QuestionCreationForm formData={formData} setFormData={setFormData} />
        </ExamsCreationWrapper>
    )
  }
  

const ExamsCreationWrapper = styled.div`
  position: absolute;
  left : 10%;
  padding-top: 5rem;
  width: 80%;

  .title {
    padding-left: 1rem;
    padding-bottom: 20px;
  }
`;
  export default ExamCreationPage