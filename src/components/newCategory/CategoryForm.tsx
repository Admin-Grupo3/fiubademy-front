import React from "react";
import { Box, Paper, FormControl, MenuItem, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCategory } from "../../login/backend-api";

interface CourseFormProps {
  formData: {
    title: string;
    description: string;
    image: File | undefined;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      image: File | undefined;
    }>
  >;
  formSubmitted: boolean;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  categories: { id: number; name: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const languages = ["english", "spanish"];

const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  setFormData,
  formSubmitted,
  setFormSubmitted,
  categories,
  handleChange,
}) => {
  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleCategoriesChange = (
    event: React.SyntheticEvent,
    newValue: { id: number; name: string }[]
  ) => {
    setFormData({ ...formData, categories: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (isFormValid()) {
      createCategory(formData);
      console.log("Formulario enviado, creando categoria", formData);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px" }}>
        <TextField
          required
          id="title"
          label="Título"
          name="title"
          fullWidth
          onChange={handleChange}
          margin="normal"
          error={formSubmitted && formData.title === ""}
          helperText={
            formSubmitted && formData.title === ""
              ? "Este campo es requerido"
              : ""
          }
        />
       

        <TextField
          required
          label="Descripción"
          id="description"
          name="description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          onChange={handleChange}
          margin="normal"
          error={formSubmitted && formData.description === ""}
          helperText={
            formSubmitted && formData.description === ""
              ? "Este campo es requerido"
              : ""
          }
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Crear categoria
        </Button>
        <h2> Categorías existentes</h2>
        {
          categories.map((category, index) => (
            <div key={index}>
              {category.name}
            </div>
          ))
        }
      </Paper>
    </Box>
  );
};

export default CourseForm;
