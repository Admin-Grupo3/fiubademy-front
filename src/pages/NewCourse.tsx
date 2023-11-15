import React, { useState, useEffect } from "react";
import CourseForm from "../components/newCourse/CourseForm";
import { createCourse, getCategories } from "../login/backend-api";
import styled from "styled-components";
import { Box, Button, Grid, Typography } from "@mui/material";
import Content from "../components/newCourse/ContentForm";
import VideoUpload from "../components/newCourse/VideoUpload";

const NewCourse: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    language: "English",
    price: "",
    description: "",
    categories: [] as { id: number; name: string }[],
    image: undefined as File | undefined,
    what_will_you_learn: [""],
    content: [""],
    video: ""
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== " ");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (isFormValid()) {
      createCourse(
        formData.title,
        formData.language,
        formData.categories.map((categories) => categories.id),
        formData.description,
        formData.price,
        formData.what_will_you_learn.slice(1),
        formData.content.slice(1),
        formData.video.split("=").pop()
      );
      console.log("Formulario enviado", formData);
    }
  };
  return (
    <NewCourseWrapper>
      <form onSubmit={handleSubmit}>

      <Typography variant="h3" align="center" color={"black"} gutterBottom>
        Crear curso
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CourseForm
            formData={formData}
            setFormData={setFormData}
            formSubmitted={formSubmitted}
            categories={categories}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <VideoUpload
            formData={formData}
            formSubmitted={formSubmitted}
            handleChange={handleChange}
          ></VideoUpload>
          <Content
            formData={formData}
            setFormData={setFormData}
            formSubmitted={formSubmitted}
          />
                  
        </Grid>

      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, fontSize: '1rem', padding: '1.5rem 3rem' }}>
              Crear curso
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

export default NewCourse;
