import React from 'react';
import Hero from "../components/Hero.tsx";
import CoursesList from "../components/CourseList.tsx";
import CategoriesList from "../components/CategoriesList.tsx";

const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      <CategoriesList />
    </div>
  )
}

export default HomePage