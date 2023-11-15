import React, { useState, useEffect } from "react";
import CourseForm from "../components/editCourse/CourseForm";
import { editCourse, getCategories } from "../login/backend-api";
import styled from "styled-components";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import VideoUpload from "../components/editCourse/VideoUpload";
import { CoursesContext } from "../context/courses_context";
import { CourseContextType } from "../@types/sideBarType";
import Content from "../components/editCourse/ContentForm";

const EditCourse: React.FC = () => {
    const {id} = useParams();
    console.log("id", id);
    const {getCourse} = React.useContext(CoursesContext) as CourseContextType;
    const [formData, setFormData] = useState({
        title: '',
        language: '',
        price: '',
        description: '' ,
        categories:  [] as { id: number; name: string }[],
        image: undefined as File | undefined,
        what_will_you_learn: [""],
        content: [""],
        video: ''
    });

    useEffect(() => {
        const single_course = getCourse(id);

        if (single_course) {
            const initialFormData = {
                title: single_course.title || '',
                language: single_course.language?.name || '',
                price: single_course.price?.toString() || '',
                description: single_course.description || '' ,
                categories:  single_course.categories || [] ,
                image: undefined as File | undefined,
                what_will_you_learn: ["", ...single_course.what_will_you_learn],
                content: ["", ...single_course.content],
                video: `https://www.youtube.com/embed/${single_course.video}` || '',
            };
            setFormData(initialFormData);
        } else {
            // Manejar el caso en el que no se encuentra ningún curso con el id proporcionado.
        }
    }, [id, getCourse]);

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

    const isFormValid = () => {
        return Object.values(formData).every((value) => value !== "");
      };

      const extractVideoId = (url: string) => {
        const embedMatch = url.match(/youtube\.com\/embed\/([^/?]+)/);
        const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
      
        if (embedMatch) {
          return embedMatch[1];
        } else if (watchMatch) {
          return watchMatch[1];
        }
      
        return "";
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (isFormValid()) {
          editCourse(id, formData.title, formData.language, formData.categories.map((categories) => categories.id), formData.description, formData.price, formData.what_will_you_learn.slice(1), formData.content.slice(1), extractVideoId(formData.video));
          console.log("Formulario enviado", formData);
        }
    };
    return (
        <NewCourseWrapper>
        <form onSubmit={handleSubmit}>

        <Typography variant="h3" align="center" color={"black"} gutterBottom>
            Editar Curso
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <CourseForm
                formData={formData}
                setFormData={setFormData}
                formSubmitted={formSubmitted}
                categories={course_categories}
                handleChange={handleChange}
            />
            </Grid>
            <Grid item xs={6}>
            <VideoUpload
                formData={formData}
                formSubmitted
                handleChange={handleChange}
            />
            <Content
            formData={formData}
            setFormData={setFormData}
          />
            </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, fontSize: '1rem', padding: '1.5rem 3rem' }}>
              Actualizar curso
            </Button>
          </Box>
        </form>
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