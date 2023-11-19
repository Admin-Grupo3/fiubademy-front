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
      <Button
              onClick={() => createPdf("Certificado de aprobacion", "Juan Perez", "React", 10)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Descargar certificado
            </Button>
    </div>
  )
}

export default HomePage