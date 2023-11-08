import React, { useEffect} from "react";
import { CourseContextType, CourseType } from "../@types/sideBarType.tsx";
import {getCategories, getPurchaseCourses} from "../login/backend-api";
import {getCourses} from "../login/backend-api";
export const CoursesContext = React.createContext<CourseContextType | null> (null);
import axios from 'axios';

interface Props {
    children: React.ReactNode;
  }
const CoursesProvider: React.FC<Props> = ({children}) => {
    const [courses, setCourse] = React.useState<CourseType[]>([]);
    const [purchaseCourses, setPurchaseCourse] = React.useState<CourseType[]>([]);

    const fetchCourses = () => {
        const data = getCourses();
        data.then(coursesData => {
            coursesData.courses = coursesData.courses.map((course: { categories: { id: any; name: any; }[]; } ) => ({
                ...course,
                categories: course.categories.map((category: { id: any; name: any; }) => ({
                    id: category.id,
                    name: category.name
                  })),
              }))

            setCourse(coursesData.courses);
          }).catch(error => {
            console.error('Error al obtener cursos:', error);
          });
    }


    const fetchPurchaseCourses = () => {
        const data = getPurchaseCourses();
        data.then(coursesData => {
            setPurchaseCourse(coursesData.courses);
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
            title: course.title,
            description: course.description,
            categories: course.categories,
            image: "",
            rating_star: 0,
            rating_count: 0,
            students: 0,
            creator: "",
            updated_date: "",
            language: course.language,
            price: course.price,
            discount: 0,
            what_will_you_learn: [],
            content: [],
            updatedAt: ""
        };
        setCourse([...courses, newCourse]);
    }
    const updateCourse = (course: CourseType) => {
        courses.filter((item:CourseType) => {
            if(item.id === course.id){
                item.title = course.title;
                item.description = course.description;
                item.categories = course.categories;
                item.language = course.language
                setCourse([...courses]);
            }
        })
    }
    useEffect(() => {
        fetchCourses();
        fetchPurchaseCourses();
        getCourses();
        getCategorys();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            courses, getCourse, saveCourse, updateCourse, getCourses, getCategorys, purchaseCourses
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesProvider;