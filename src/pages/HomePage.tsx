import React from 'react';
import Hero from "../components/Hero.tsx";
import CoursesList from "../components/CourseList.tsx";
import CategoriesList from "../components/CategoriesList.tsx";
import CertificationsList from '../components/CertificationsList.tsx';
import LearningPathList from "../components/LearningPathList.tsx";
import { Button } from '@mui/material';
import createPdf from '../utils/generatePDF.tsx';


const HomePage = () => {
  return (
    <div className='holder'>
      <Hero />
      <CoursesList />
      <CertificationsList />
      <CategoriesList />
      <LearningPathList />
    </div>
  )
}

export default HomePage