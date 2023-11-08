import styled from "styled-components";
import Course from "../components/Course.tsx";
import CoursesList from "../components/CourseList.tsx";
import Tabs from "../components/Tabs.tsx";
import test_courses from "../utils/data.tsx";
import { CoursesContext } from '../context/courses_context';
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const SearchResults = () => {
  const coursesContext = React.useContext(CoursesContext)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  return (
    <SearchResultsWrapper>
      <div className="container">
        <div className="tabs">
        <h2> Resultados para "{query}" </h2>
          <div className="tabs-body">
          {
            coursesContext?.courses.filter((course: any) => course.title.toLowerCase().includes(query?.toLowerCase())).map((course: any) => (
              <Course key = {course.id} {...course} />
            ))
          }
          </div>
        </div>
      </div>
    </SearchResultsWrapper>
  );
};

const SearchResultsWrapper = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;
export default SearchResults;
