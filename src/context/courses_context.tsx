import React, { useEffect} from "react";
import { CourseContextType, CourseType } from "../@types/sideBarType.tsx";
import {getCategories} from "../login/backend-api";

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
        const data = getCategories();
        data.then(categorias => {
            const categories = categorias.map((item: { id: number; name: String; }) => ({ id: item.id, name: item.name }));
            console.log(categories);
            return categories
          }).catch(error => {
            console.error('Error al obtener categorías:', error);
          });
        return [];
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