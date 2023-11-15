import React from 'react';
import styled from "styled-components";
import Tabs from "./Tabs.tsx";
import { CoursesContext } from '../context/courses_context';
import { CourseContextType } from '../@types/sideBarType.tsx';
import CourseInfo from './newLearningPath/CourseInfo.tsx';
import Course from './Course.tsx';

const CertificationsList = () => {
  const coursesContext = React.useContext(CoursesContext)
  return (
    <CoursesListWrapper>
      <div className='container'>
        <div className='courses-list-top'>
          <h2>Companies certifications</h2>
        </div> 
      <div className='tabs'>
        <div className='tabs-body'>
          {
            coursesContext.courses.filter((course: any) => course.company).map((course: any) => (
              <Course key = {course.id} {...course} />
            ))
          }
        </div>
      </div>
      </div>
    </CoursesListWrapper>
  )
}

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
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

export default CertificationsList