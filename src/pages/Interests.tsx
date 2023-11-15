import styled from "styled-components";
import Course from "../components/Course.tsx";
import { CoursesContext } from "../context/courses_context";
import React from "react";
import { UsersContext } from "../context/users_context.tsx";

const Interests = () => {
  const coursesContext = React.useContext(CoursesContext);
  const usersContext = React.useContext(UsersContext);
  const user = usersContext?.user;

  const interestsIds =
    user?.interests.map((interest: { id: any }) => interest.id) || [];

  const filteredCourses = coursesContext?.courses.filter((course) =>
    course.categories.some((category) => interestsIds.includes(category.id))
  );
  return (
    <InterestsWrapper>
      <div className="container">
        <div className="tabs">
          <h2>Mis intereses</h2>
          <h3>
            {user &&
              user.interests
                .map((interest: { name: any }) => interest.name)
                .join(", ")}
          </h3>{" "}
          <div className="tabs-body">
            {filteredCourses &&
              filteredCourses.map((course) => (
                <Course key={course.id} {...course} />
              ))}
          </div>
        </div>
      </div>
    </InterestsWrapper>
  );
};

const InterestsWrapper = styled.div`
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
export default Interests;
