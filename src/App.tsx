import { Component } from 'react'
import './App.css'
import './login/signin.tsx'
import Navbar from './components/Navbar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './login/signup.tsx';
import SignIn from './login/signin.tsx';
import HomePage from './pages/HomePage.tsx';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Navbar />
        <Routes>  
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<SignUp />} /> 
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App
