import dayjs from "dayjs";

// @types.todo.ts
export interface SidebarType {
    isOpen: boolean;
  }
  export type SideBarContextType = {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
  };

  interface Language {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CourseType {
    id: number;
    title: string;
    description: string;
    categories: {id: number, name: string}[];
    image: string;
    rating_star: number;
    rating_count: number;
    students: number;
    creator: string;
    updated_date: string;
    language: Language;
    price: number;
    discount: number;
    what_will_you_learn: string[];
    content: string[];
    updatedAt: string
  }

  export type CourseContextType = {
    courses: CourseType[];
    saveCourse:(course: CourseType) => void;
    updateCourse:(course: CourseType) => void;
    getCourses:() => CourseType[];
    getCourse:(id: number) => CourseType | undefined;
    getCategorys:() => {id: number, name: string}[];
    purchaseCourses: CourseType[];
  };

  export interface UserType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: dayjs.Dayjs;
    interests: {id: number, name: string}[];
  }

  export type UserContextType = {
    user: UserType | undefined;
  };
