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

class App extends Component {
  render() {
    return (
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
          <Route path = "/exam" element = {<ExamsPage />} />
          <Route path = "/examCreation/:id" element = {<ExamCreationPage />} />
          <Route path = "/mycourses" element = {<MyCourses />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App
