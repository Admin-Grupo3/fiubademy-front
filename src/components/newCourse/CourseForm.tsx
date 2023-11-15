import React from "react";
import { Box, Paper, FormControl, MenuItem, Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import ImageUpload from "./ImageUpload";

interface CourseFormProps {
  formData: {
    title: string;
    language: string;
    price: string;
    description: string;
    categories: { id: number; name: string }[];
    image: File | undefined;
    what_will_you_learn: string[];
    content: string[];
    video: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      language: string;
      price: string;
      description: string;
      categories: { id: number; name: string }[];
      image: File | undefined;
      what_will_you_learn: string[];
      content: string[];
      video: string;
    }>
  >;
  formSubmitted: boolean;
  categories: { id: number; name: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const languages = ["english", "spanish"];

const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  setFormData,
  formSubmitted,
  categories,
  handleChange,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, image: file });
  };

  const handleCategoriesChange = (
    _event: React.SyntheticEvent,
    newValue: { id: number; name: string }[]
  ) => {
    setFormData({ ...formData, categories: newValue });
  };

  return (
    <Box
      component="form"
      noValidate
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
          <ImageUpload
            formData={formData}
            handleImageUpload={handleImageUpload}
          />
        </FormControl>


      </Paper>
    </Box>
  );
};

export default CourseForm;
