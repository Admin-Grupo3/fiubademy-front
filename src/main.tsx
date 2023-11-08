import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SidebarProvider from './context/sidebar_context.tsx';
import CoursesProvider from './context/courses_context.tsx';
import UsersProvider from './context/users_context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarProvider>
    <UsersProvider>
    <CoursesProvider>
    <App />
    </CoursesProvider>
    </UsersProvider>
  </SidebarProvider>
)
