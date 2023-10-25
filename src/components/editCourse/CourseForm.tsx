import React from "react";
import {
  Box,
  Paper,
  FormControl,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { editCourse } from "../../login/backend-api";

interface CourseFormProps {
  formData: {
    title: string;
    language: string;
    hours: string;
    price: string;
    description: string;
    category: string;
    image: File | undefined;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      language: string;
      hours: string;
      price: string;
      description: string;
      category: string;
      image: File | undefined;
    }>
  >;
  formSubmitted: boolean;
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  categories: { id: number; name: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const languages = ["English", "Spanish"];

const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  setFormData,
  formSubmitted,
  setFormSubmitted,
  categories,
  handleChange,
}) => {

  console.log(formData)
  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (isFormValid()) {
      editCourse(
        formData.title,
        formData.language,
        [formData.category]
      );
      console.log("Formulario enviado", formData);
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
        defaultValue={formData.title}
        margin="normal"
        error={formSubmitted && formData.title === ""}
        helperText={
          formSubmitted && formData.title === ""
            ? "Este campo es requerido"
            : ""
        }
      />
      <FormControl fullWidth>
        <TextField
          required
          id="language"
          name="language"
          defaultValue={formData.language}
          select
          margin="normal"
          label="Idioma"
          onChange={handleChange}
          error={formSubmitted && formData.language === ""}
          helperText={
            formSubmitted && formData.language === ""
              ? "Este campo es requerido"
              : ""
          }
        >
          {languages.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <TextField
        required
        label="Horas Estimadas"
        id="hours"
        name="hours"
        fullWidth
        type="number"
        InputProps={{
          inputProps: { min: 0 },
        }}
        defaultValue={formData.hours}
        onChange={handleChange}
        margin="normal"
        error={formSubmitted && formData.hours === ""}
        helperText={
          formSubmitted && formData.hours === ""
            ? "Este campo es requerido"
            : ""
        }
      />
      <TextField
        required
        label="Importe"
        id="price"
        name="price"
        fullWidth
        type="number"
        defaultValue={formData.price}
        InputProps={{
          inputProps: { min: 0 },
        }}
        onChange={handleChange}
        margin="normal"
        error={formSubmitted && formData.price === ""}
        helperText={
          formSubmitted && formData.price === ""
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
        defaultValue={formData.description}
        error={formSubmitted && formData.description === ""}
        helperText={
          formSubmitted && formData.description === ""
            ? "Este campo es requerido"
            : ""
        }
      />
      <FormControl fullWidth>
        <TextField
          required
          id="category"
          name="category"
          select
          margin="normal"
          label="Categoria"
          defaultValue={formData.category}
          onChange={handleChange}
          error={formSubmitted && formData.category === ""}
          helperText={
            formSubmitted && formData.category === ""
              ? "Este campo es requerido"
              : ""
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Actualizar curso
      </Button>
      </Paper>
    </Box>
  );
};

export default CourseForm;

