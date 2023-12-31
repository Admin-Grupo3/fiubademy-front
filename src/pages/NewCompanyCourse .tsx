import React, { useState, useEffect } from "react";
import CompanyCourseForm from "../components/CompanyCourse/CompanyCourseForm";
import ImageUpload from "../components/newCourse/ImageUpload";
import { getCategories } from "../login/backend-api";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";

const NewCompanyCourse: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    certification: "",
    language: "English",
    empresa: "",
    price: "",
    description: "",
    categories: [],
    image: undefined as File | undefined,
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, image: file });
  };

  return (
    <NewCourseWrapper>
      <Typography variant="h3" align="center" color={"black"} gutterBottom>
        Crear curso de una empresa
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CompanyCourseForm
            formData={formData}
            setFormData={setFormData}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            categories={categories}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <ImageUpload
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

export default NewCompanyCourse;
