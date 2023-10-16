import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

const categories = [
  "Python",
  "Data Science",
  "AWS",
  "Design",
  "Marketing",
  "Web Development",
];

const languages = ["Ingles", "Español"];

const NewCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    language: "Ingles",
    hours: "",
    price: "",
    description: "",
    category: "",
    image: undefined as File | undefined,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (isFormValid()) {
      // Send data tu backend
      console.log("Formulario enviado", formData);
    }
  };

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
        <Typography variant="h3" align="center" color={"black"} gutterBottom>
          Crear curso
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
                  name="langueage"
                  defaultValue="Ingles"
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
                <TextField
                  required
                  id="category"
                  name="category"
                  select
                  margin="normal"
                  label="Categoria"
                  onChange={handleChange}
                  error={formSubmitted && formData.category === ""}
                  helperText={
                    formSubmitted && formData.category === ""
                      ? "Este campo es requerido"
                      : ""
                  }
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" style={{ marginBottom: "10px" }}>
                Subir imagen del curso
              </Typography>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  minHeight: "150px",
                  textAlign: "center",
                }}
              >
                {formData.image ? (
                  <div>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Previsualización"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-input"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-input">
                      <Button variant="contained" component="span">
                        Subir Imagen
                      </Button>
                    </label>
                  </div>
                )}
              </Paper>
            </Paper>
          </Grid>
        </Grid>

        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear curso
        </Button>
      </Box>
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
