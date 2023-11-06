import React, { useState, useEffect } from "react";
import CourseForm from "../components/editCourse/CourseForm";
import { getCategories } from "../login/backend-api";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import VideoUpload from "../components/editCourse/VideoUpload";
import { CoursesContext } from "../context/courses_context";
import { CourseContextType } from "../@types/sideBarType";

const EditCourse: React.FC = () => {
    const {id} = useParams();
    console.log("id", id);
    const {getCourse} = React.useContext(CoursesContext) as CourseContextType;
    const [formData, setFormData] = useState({
        title: '',
        language: '',
        hours: "",
        price: '',
        description: '' ,
        categories:  [] as { id: number; name: string }[],
        image: undefined as File | undefined,
    });

    useEffect(() => {
        const single_course = getCourse(id);

        if (single_course) {
            const initialFormData = {
                title: single_course.title || '',
                language: single_course.language?.name || '',
                hours: "",
                price: single_course.price?.toString() || '',
                description: single_course.description || '' ,
                categories:  single_course.categories || [] ,
                image: undefined as File | undefined,
            };
            setFormData(initialFormData);
        } else {
            // Manejar el caso en el que no se encuentra ningún curso con el id proporcionado.
        }
    }, [id, getCourse]);
    console.log("FORM DATA:", formData)

    const [course_categories, setCategories] = useState<{ id: number; name: string }[]>(
        []
    );

    useEffect(() => {
        getCategories()
        .then((course_categories) => {
            setCategories(course_categories);
        })
        .catch((error) => console.error("Error al obtener categorías:", error));
    }, []);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData({ ...formData, image: file });
    };

    return (
        <NewCourseWrapper>
        <Typography variant="h3" align="center" color={"black"} gutterBottom>
            Editar Curso
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <CourseForm
                formData={formData}
                setFormData={setFormData}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
                categories={course_categories}
                handleChange={handleChange}
                
            />
            </Grid>
            <Grid item xs={6}>
            <VideoUpload
                formData={formData}
                handleImageUpload={handleImageUpload}
            />
            </Grid>
        </Grid>
        </NewCourseWrapper>
    );
    };

const NewCourseWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p {
    font-size: 1.8rem;
  }
  background-color: var(--clr-white);
`;

export default EditCourse;