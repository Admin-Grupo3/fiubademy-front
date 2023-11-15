import React from 'react';
import styled from "styled-components";
import { LearningPathsContext } from '../context/learningPaths_context.tsx';
import LearningPath from './LearningPath.tsx';

const LearningPathList = () => {
  const learningPathsContext = React.useContext(LearningPathsContext)

  console.log("LEARNING PATHS");
  console.log(learningPathsContext?.learningPaths);
  
  return (
    <LearningPathListWrapper>
      <div className='container'>
        <div className='learning-paths-list-top'>
          <h2>Follow a learning path</h2>
        </div>

        {
          learningPathsContext?.learningPaths.map((learningPath: any) => (
            <LearningPath key = {learningPath.id} {...learningPath} />
          ))
        }
      </div>
    </LearningPathListWrapper>
  )
}

const LearningPathListWrapper = styled.div`
  padding: 40px 0;
  .learning-paths-list-top p{
    font-size: 1.8rem;
  }
  background-color: var(--clr-white);
`;

export default LearningPathList