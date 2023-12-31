import React, {useState} from 'react';
import styled from "styled-components";
import Course from "./Course.tsx";
import {PYTHON, WEB_DEVELOPMENT, DATA_SCIENCE, AWS, DESIGN, MARKETING} from "../utils/constants";
import { CoursesContext } from '../context/courses_context';
import { CourseType } from '../@types/sideBarType.tsx';

const Tabs = () => {
  const coursesContext = React.useContext(CoursesContext)

  const [activeTab, setActiveTab] = useState(PYTHON);
  const tabHandler = (category: React.SetStateAction<string>) => {
    setActiveTab(category);
  }

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === PYTHON}`} onClick = {() => tabHandler(PYTHON)}>Python</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === WEB_DEVELOPMENT}`} onClick = {() => tabHandler(WEB_DEVELOPMENT)}>Web Development</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === DATA_SCIENCE}`} onClick = {() => tabHandler(DATA_SCIENCE)}>Data Science</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === AWS}`} onClick = {() => tabHandler(AWS)}>AWS Certification</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === DESIGN}`} onClick = {() => tabHandler(DESIGN)}>Design</button>
          </li>
          <li className='tabs-head-item'>
            <button type = "button" className={`tab-btn ${activeTab === MARKETING}`} onClick = {() => tabHandler(MARKETING)}>Marketing</button>
          </li>
        </ul>

        <div className='tabs-body'>
          {
            coursesContext?.courses.filter((course: any) => course.categories.some((category: any) => category.name.toLowerCase() === activeTab)).map((course: any) => (
              <Course key = {course.id} {...course} />
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

export default Tabs