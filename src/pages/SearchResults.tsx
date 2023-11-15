import styled from "styled-components";
import Course from "../components/Course.tsx";
import { CoursesContext } from '../context/courses_context';
import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const coursesContext = React.useContext(CoursesContext)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const language = new URLSearchParams(location.search).get('language'); // Obtener el parámetro del idioma

  let filteredCourses = coursesContext?.courses;
  filteredCourses = filteredCourses?.filter((course: any) => course.title.toLowerCase().includes(query?.toLowerCase()));

  if (language && language !== 'All languages') {
    filteredCourses = filteredCourses?.filter((course: any) => course.language.name === language.toLowerCase());
  }

  return (
    <SearchResultsWrapper>
      <div className="container">
        <div className="tabs">
        <h2> Resultados para "{query}" en "{language}"</h2>
          <div className="tabs-body">
          {
            filteredCourses?.map((course: any) => (
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
