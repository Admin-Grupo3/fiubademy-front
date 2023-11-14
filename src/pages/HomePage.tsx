import React from 'react';
import Hero from "../components/Hero.tsx";
import CoursesList from "../components/CourseList.tsx";
import CategoriesList from "../components/CategoriesList.tsx";
import CertificationsList from '../components/CertificationsList.tsx';

const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      <CertificationsList />
      <CategoriesList />
    </div>
  )
}

export default HomePage