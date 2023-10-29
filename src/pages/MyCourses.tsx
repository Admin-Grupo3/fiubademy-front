import styled from "styled-components";
import Course from "../components/Course.tsx";
import CoursesList from "../components/CourseList.tsx";
import Tabs from "../components/Tabs.tsx";
import test_courses from "../utils/data.tsx";

const MyCourses = () => {
  return (
    <MyCoursesWrapper>
      <div className="container">
        <div className="tabs">
          <div className="tabs-body">
            {test_courses.map((course) => (
              // Pedirle al back los cursos que compró el usuario
              <Course key={course.id} {...course}/>
            ))}
          </div>
        </div>
      </div>
    </MyCoursesWrapper>
  );
};

const MyCoursesWrapper = styled.div`
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
export default MyCourses;
