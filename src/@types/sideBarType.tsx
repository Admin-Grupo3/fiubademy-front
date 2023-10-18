// @types.todo.ts
export interface SidebarType {
    isOpen: boolean;
  }
  export type SideBarContextType = {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
  };

  export interface CourseType {
    id: number;
    name: string;
    description: string;
    category: string;
  }
  export type CourseContextType = {
    courses: CourseType[];
    saveCourse:(course: CourseType) => void;
    updateCourse:(course: CourseType) => void;
    getCourses:() => CourseType[];
    getCourse:(id: number) => CourseType | undefined;
    getCategorys:() => {id: Number, name: String}[];
  };