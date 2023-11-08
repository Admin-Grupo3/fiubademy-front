import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SidebarProvider from './context/sidebar_context.tsx';
import CoursesProvider from './context/courses_context.tsx';
import { RoleProvider } from './context/roles_context.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RoleProvider>
  <SidebarProvider>
    <CoursesProvider>
    <App />
    </CoursesProvider>
  </SidebarProvider>
  </RoleProvider>
)
