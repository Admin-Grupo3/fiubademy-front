import React from "react";
import { CoursesContext } from "../context/courses_context.tsx";
import styled from "styled-components";
import CourseModeration from "../components/CourseModeration.tsx";

const CoursesModeration = () =>{
    const coursesContext = React.useContext(CoursesContext)
    return(
        <TabsWrapper>
            <div className='tabs'>
                <h1> Revision de cursos</h1>
                <div className='tabs-body'>
                {
                    coursesContext?.courses.map((course: any) => (
                    <CourseModeration key = {course.id} {...course} />
                    ))
                }
                </div>
            </div>
        </TabsWrapper>
    )
}
const TabsWrapper = styled.div`
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
export default CoursesModeration;