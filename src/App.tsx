import { Component } from 'react'
import './App.css'
import './login/signin.tsx'
import Navbar from './components/Navbar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './login/signup.tsx';
import SignIn from './login/signin.tsx';
import HomePage from './pages/HomePage.tsx';
import NewCourse from './pages/NewCourse.tsx';
import Courses from './pages/CoursesPage.tsx';
import SingleCourse from './pages/SingleCoursePage.tsx';
import EditCourse from './pages/EditCourse.tsx';
import ExamsPage from './pages/ExamsPage.tsx';
import ExamCreationPage from './pages/ExamCreationPage.tsx';
import MyCourses from './pages/MyCourses.tsx';
import NewCompanyCourse from './pages/NewCompanyCourse .tsx';
import LearningPathCreation from './pages/LearningPathCreation.tsx';
import Profile from './pages/Profile.tsx';
import SearchResults from './pages/SearchResults.tsx';
import CreateCategory from './pages/CreateCategory.tsx';
import CoursesModeration from './pages/CoursesModeration.tsx';
import LearningPath from './components/LearningPath.tsx';
import SingleLearningPath from './pages/SingleLearningPath.tsx';
import Interests from './pages/Interests.tsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
    fontSize: 22
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>  
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Courses" element={<NewCourse />} />
            <Route path="/signUp" element={<SignUp />} /> 
            <Route path="/signIn" element={<SignIn />} />
            <Route path = "/category/:category" element = {<Courses />} />
            <Route path = "/courses/:id" element = {<SingleCourse />} />
            <Route path = "/editCourse/:id" element = {<EditCourse />} />
            <Route path = "/exam/:id" element = {<ExamsPage />} />
            <Route path = "/examCreation/:id" element = {<ExamCreationPage />} />
            <Route path = "/mycourses" element = {<MyCourses />} />
            <Route path="/companycourses" element={<NewCompanyCourse />} />
            <Route path = "/learningPath" element = {<LearningPathCreation />} />
            <Route path = "/profile" element = {<Profile />} />
            <Route path = "/search" element = {<SearchResults/>} />
            <Route path = "/category" element = {<CreateCategory/>} />
            <Route path = "/moderateCourses" element = {<CoursesModeration/>} />
            <Route path = "/learning-paths/:id" element = {<SingleLearningPath />} />
            <Route path = "/interests" element = {<Interests/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App
