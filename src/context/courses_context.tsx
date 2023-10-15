import React, { useEffect} from "react";
import { CourseContextType, CourseType } from "../@types/sideBarType.tsx";


export const CoursesContext = React.createContext<CourseContextType | null> (null);
interface Props {
    children: React.ReactNode;
  }
const CoursesProvider: React.FC<Props> = ({children}) => {
    const [courses, setCourse] = React.useState<CourseType[]>([
        {
            id:1,
            name:"test",
            description:"test",
            category:"test",
        },
        {
            id: 2,
            name: "test2",
            description: "test2",
            category: "test",
        },
    ]);

    const getCourses = () => {
        return courses;
    }

    const getCourse = (id: number) => {
        const singleCourse = courses.find(course => course.id === id);
        return singleCourse;
    }

    const getCategorys = () => {
        const categories = [...new Set(courses.map(item => item.category))];
        return categories;
        
    }
    const saveCourse = (course: CourseType) => {
        const newCourse: CourseType = {
            id: Math.random(),
            name: course.name,
            description: course.description,
            category: course.category,
        };
        setCourse([...courses, newCourse]);
    }
    const updateCourse = (course: CourseType) => {
        courses.filter((item:CourseType) => {
            if(item.id === course.id){
                item.name = course.name;
                item.description = course.description;
                item.category = course.category;
                setCourse([...courses]);
            }
        })
    }
    useEffect(() => {
        getCourses();
        getCategorys();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            courses, getCourse, saveCourse, updateCourse, getCourses, getCategorys
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesProvider;