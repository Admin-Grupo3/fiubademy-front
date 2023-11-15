import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SidebarProvider from './context/sidebar_context.tsx';
import CoursesProvider from './context/courses_context.tsx';
import UsersProvider from './context/users_context.tsx';

import { RoleProvider } from './context/roles_context.tsx';
import LearningPathsProvider from './context/learningPaths_context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RoleProvider>
  <SidebarProvider>
    <UsersProvider>
    <CoursesProvider>
    <LearningPathsProvider>
    <App />
    </LearningPathsProvider>
    </CoursesProvider>
    </UsersProvider>
  </SidebarProvider>
  </RoleProvider>
)
