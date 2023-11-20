import React from 'react';
import styled from "styled-components";
import { LearningPathsContext } from '../context/learningPaths_context.tsx';
import LearningPath from './LearningPath.tsx';

const LearningPathList = () => {
  const learningPathsContext = React.useContext(LearningPathsContext)
  
  return (
    <LearningPathListWrapper>
      <div className='container'>
        <div className='learning-paths-list-top'>
          <h2>Follow a learning path</h2>
        </div>
        <div className='tabs'>
          <div className='tabs-body'>
          {
            learningPathsContext?.learningPaths.map((learningPath: any) => (
              <LearningPath key = {learningPath.id} {...learningPath} />
            ))
          }
          </div>
        </div>
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
  .tabs{
    margin-top: 16px;
    .tabs-head-item button{
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;
      color: var(--clr-white);


      &:hover{
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body{
      margin-top: 32px;
    }

    @media screen and (min-width: 600px){
      .tabs-body{
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px){
      .tabs-body{
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px){
      .tabs-body{
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default LearningPathList