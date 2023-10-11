import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './login/signup.tsx';
import SignIn from './login/signin.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {path: "/signUp", element: <SignUp />},
  {path: "/signIn", element: <SignIn />},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
