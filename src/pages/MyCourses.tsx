import styled from "styled-components";
import Course from "../components/Course.tsx";
import { CoursesContext } from "../context/courses_context";
import React from "react";
import { UsersContext } from "../context/users_context.tsx";
import ProgressBar from "../components/ProgressBar.tsx";
import { RoleContext } from "../context/roles_context.tsx";
import { CourseType } from "../@types/sideBarType.tsx";
import { LearningPathsContext } from "../context/learningPaths_context.tsx";
import LearningPath from "../components/LearningPath.tsx";

const MyCourses = () => {
  const coursesContext = React.useContext(CoursesContext);
  const usersContext = React.useContext(UsersContext);
  const user = usersContext?.user;
  const totalCourses = coursesContext?.purchaseCourses.length;
  const learningPathsContext = React.useContext(LearningPathsContext)

  let approvedCourses: string | any[] = [];
  if (coursesContext?.purchaseCourses && user?.coursesAproved) {
    const approvedCourseIds = user.coursesAproved.map(
      (course: { courseId: any }) => course.courseId
    );

    approvedCourses = coursesContext.purchaseCourses.filter(
      (course: CourseType) => approvedCourseIds.includes(course.id)
    );
  }

  const totalApprovedCourses = approvedCourses.length;
  let approvedProgress = 0;
  if (totalCourses) {
    approvedProgress = totalApprovedCourses / totalCourses;
  }
  const { role } = React.useContext(RoleContext);
  let displayedPaths: React.ReactNode[] = [];
  if (role === "Student" && learningPathsContext?.purchasedLearningPaths) {
    displayedPaths = learningPathsContext.purchasedLearningPaths.map((learningPath: any) => (
      <LearningPath key = {learningPath.id} {...learningPath} />
      ));
  } else if (learningPathsContext?.learningPaths && role === "Teacher") {
    displayedPaths = learningPathsContext.learningPaths
      .filter(
        (path: any) => path.creator?.id === user?.id 
      )
      .map((learningPath: any) => <LearningPath key = {learningPath.id} {...learningPath} />);
  } else if (learningPathsContext?.learningPaths && role === "Admin") {
    displayedPaths = learningPathsContext.learningPaths.map((learningPath: any) =>
    <LearningPath key = {learningPath.id} {...learningPath} />);
  }

  let displayedCourses: React.ReactNode[] = [];
  if (role === "Student" && coursesContext?.purchaseCourses) {
    displayedCourses = coursesContext.purchaseCourses.map((course: any) => (
      <Course key={course.id} user={user} {...course} />
    ));
  } else if (coursesContext?.courses && role === "Company") {
    displayedCourses = coursesContext.courses
      .filter(
        (course: any) => course.creator?.id === user?.id && course.company
      )
      .map((course: any) => <Course key={course.id} user={user} {...course} />);
  } else if (coursesContext?.courses && role === "Teacher") {
    displayedCourses = coursesContext.courses
      .filter(
        (course: any) => course.creator?.id === user?.id && !course.company
      )
      .map((course: any) => <Course key={course.id} user={user} {...course} />);
  } else {
    displayedCourses = coursesContext?.courses.map((course: any) => (
      <Course key={course.id} {...course} />
    ));
  }
  
  let sales: any[] = [];
  if (coursesContext?.purchases && user?.id) {
    sales = coursesContext.purchases.filter(
      (sale) => (sale.course?.creator?.id === user.id)
    ); 
  }

  const coursesSalesCount: { [key: string]: number } = {};
  sales.forEach((sale) => {
    const courseId = sale.course?.id;
    const company = sale.course?.company;
    if (courseId) {
      if (company && role == "Company") {
        coursesSalesCount[courseId] = (coursesSalesCount[courseId] || 0) + 1;
      } else if (!company && role == "Teacher") {
        coursesSalesCount[courseId] = (coursesSalesCount[courseId] || 0) + 1;
      }
    }
  });
  const coursesRevenue: { [key: string]: number } = {};

  sales.forEach((sale: any) => {
    const courseId = sale.course?.id;
    const price = sale.course?.price || 0;
    const company = sale.course?.company;

    if (courseId) {
      if (company && role == "Company") {
        coursesRevenue[courseId] = (coursesRevenue[courseId] || 0) + price;
      } else if (!company && role == "Teacher") {
        coursesRevenue[courseId] = (coursesRevenue[courseId] || 0) + price;
      }
    }
  });

  let totalSales = 0;
  let totalRevenue = 0;

  Object.keys(coursesSalesCount).forEach((courseId) => {
    totalSales += coursesSalesCount[courseId];
    totalRevenue += coursesRevenue[courseId] || 0;
  });

  const coursesTable = (
    <table
      style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid #000" }}>
          <th style={{ padding: "8px", background: "#f2f2f2" }}>Curso</th>
          <th style={{ padding: "8px", background: "#f2f2f2" }}>Ventas</th>
          <th style={{ padding: "8px", background: "#f2f2f2" }}>Recaudado</th>
        </tr>
      </thead>
      <tbody>
        {displayedCourses.map((course: any) => (
          <tr key={course.props.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "8px" }}>{course.props.title}</td>
            <td style={{ padding: "8px" }}>
              {coursesSalesCount[course.props.id] || 0}
            </td>
            <td style={{ padding: "8px" }}>
              ${coursesRevenue[course.props.id] || 0}
            </td>
          </tr>
        ))}
        <tr style={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}>
          <td style={{ padding: "8px" }}>Total</td>
          <td style={{ padding: "8px" }}>{totalSales}</td>
          <td style={{ padding: "8px" }}>${totalRevenue}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <MyCoursesWrapper>
      <div className="container">
        <div className="tabs">
          {(role === "Teacher" || role === "Company") && (
            <div style={{ marginBottom: "20px" }}>
              <h2> Estadisticas </h2>
              {coursesTable}
            </div>
          )}
          
          {role === "Student" && (
            <div style={{ marginBottom: "20px" }}>
              <h2> Avance </h2>
              <p style={{ marginBottom: "20px" }}>
                Usted tiene <strong>{totalApprovedCourses}</strong> cursos
                aprobados de <strong>{totalCourses}</strong> totales
              </p>
              <ProgressBar progress={approvedProgress * 100} />
            </div>
          )}
          <h2> Mis cursos </h2>
          <div className="tabs-body">{displayedCourses}</div>
          <h2> Mis caminos de aprendizaje </h2>
          <div className="tabs-body">{displayedPaths}</div>
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
