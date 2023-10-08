import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './login/signin.tsx'
import SignIn from './login/signin.tsx'

class App extends Component {
  render() {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}

export default App
