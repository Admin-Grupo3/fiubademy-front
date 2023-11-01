import styled from "styled-components";
import MultipleChoiceForm from "../components/exams/MultpileChoiceForm"
import { Grid, Stack } from "@mui/material";

const ExamsPage = () => {
    return (
        <ExamsPageWrapper>
            <h1 className="title">Exam topic</h1>
            <MultipleChoiceForm />
        </ExamsPageWrapper>
    )
  }
  

const ExamsPageWrapper = styled.div`
  position: absolute;
  left : 10%;
  padding-top: 5rem;
  width: 80%;

  .title {
    padding-left: 1rem;
    padding-bottom: 20px;
  }
`;
  export default ExamsPage
