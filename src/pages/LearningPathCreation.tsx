import styled from "styled-components";
import CoursesSelection from "../components/newLearningPath/CoursesSelection";
import LearningPathForm from "../components/newLearningPath/LearningPathForm";


const LearningPathCreation = () => {
  
    return (
        <LearningPathCreationWrapper>
            <h1 className="title">Creating a new learning path</h1>
            <h2 className="title">Select the courses you want to include in your learning path</h2>
            <LearningPathForm />
        </LearningPathCreationWrapper>
    )
  }
  

const LearningPathCreationWrapper = styled.div`
  position: absolute;
  left : 10%;
  padding-top: 5rem;
  width: 80%;

  .title {
    padding-left: 1rem;
    padding-bottom: 20px;
  }
`;
  export default LearningPathCreation