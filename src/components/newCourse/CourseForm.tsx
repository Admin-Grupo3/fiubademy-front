import React from "react";
import { Box, Paper, FormControl, MenuItem, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCourse } from "../../login/backend-api";

interface CourseFormProps {
  formData: {
    title: string;
    language: string;
    hours: string;
    price: string;
    description: string;
    categories: { id: number; name: string }[];
    image: File | undefined;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      language: string;
      hours: string;
      price: string;
      description: string;
      categories: { id: number; name: string }[];
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
      createCourse(
        formData.title,
        formData.language,
        formData.categories.map((categories) => categories.id),
        formData.description,
        formData.price
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
            defaultValue="English"
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
          error={formSubmitted && formData.description === ""}
          helperText={
            formSubmitted && formData.description === ""
              ? "Este campo es requerido"
              : ""
          }
        />
        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={categories}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={handleCategoriesChange}
            renderInput={(params) => (
              <TextField
                margin="normal"
                required
                {...params}
                onChange={handleChange}
                label="Categorias"
                error={formSubmitted && formData.categories.length === 0}
                helperText={
                  formSubmitted && formData.categories.length === 0
                    ? "Este campo es requerido"
                    : ""
                }
              />
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Crear curso
        </Button>
      </Paper>
    </Box>
  );
};

export default CourseForm;
