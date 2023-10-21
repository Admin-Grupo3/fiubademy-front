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
    image: string;
    rating_star: number;
    rating_count: number;
    students: number;
    creator: string;
    updated_date: string;
    lang: string;
    actual_price: number;
    discounted_price: number;
    what_you_will_learn: string[];
    content: string[];
  }
  export type CourseContextType = {
    courses: CourseType[];
    saveCourse:(course: CourseType) => void;
    updateCourse:(course: CourseType) => void;
    getCourses:() => CourseType[];
    getCourse:(id: number) => CourseType | undefined;
    getCategorys:() => {id: number, name: string}[];
  };

