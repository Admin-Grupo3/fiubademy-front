import React, { useEffect} from "react";
import { CourseContextType, CourseType } from "../@types/sideBarType.tsx";
import {getCategories} from "../login/backend-api";
import {getCourses} from "../login/backend-api";
import test_courses from "../utils/data.tsx";
export const CoursesContext = React.createContext<CourseContextType | null> (null);
import axios from 'axios';

interface Props {
    children: React.ReactNode;
  }
const CoursesProvider: React.FC<Props> = ({children}) => {
    const [courses, setCourse] = React.useState<CourseType[]>([]);

    const fetchCourses = () => {
        const data = getCourses();
        data.then(coursesData => {
            setCourse(coursesData.courses);
          }).catch(error => {
            console.error('Error al obtener cursos:', error);
          });
    }

    const getCourse = (id: any) => {
        console.log("searching for course:", id);
        const singleCourse = courses.find(course => course.id === id);
        console.log("found course:", singleCourse);
        
        return singleCourse;
    }
    const getCategorys = () => {
        const data = getCategories();
        data.then(categorias => {
            const categories = categorias.map((item: { id: number; name: String; }) => ({ id: item.id, name: item.name }));
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
        fetchCourses();
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