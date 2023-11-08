import styled from "styled-components";
import MultipleChoiceForm from "../components/exams/MultpileChoiceForm"
import { Grid, Stack } from "@mui/material";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getExams } from "../login/backend-api";

const ExamsPage =  () => {
  const { id } = useParams();
  const [exams, setExams] = useState(null);
  useEffect(() => {
    const fetchExams = async () => {
      const response = await getExams(id);
      setExams(response);
    }
    fetchExams();
  }, [id]);
  
  console.log(exams)
    return (
        <ExamsPageWrapper>
            <h1 className="title">Exam topic</h1>
            <MultipleChoiceForm exams={exams} courseId={id}/>
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
