import React, { useState } from "react";
import {
  Box,
  Paper,
  FormControl,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CoursesSelection from "./CoursesSelection";
import { createLearningPath } from "../../login/backend-api";




const LearningPathForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [coursesSelected, setCoursesSelected ] = React.useState([]);  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   

    if (isFormValid()) {
      createLearningPath(formData.title, formData.description, coursesSelected);

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
        error={ formData.title === ""}
        helperText={
          formData.title === ""
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
        error={formData.description === ""}
        helperText={
          formData.description === ""
            ? "Este campo es requerido"
            : ""
        }
      />
      <CoursesSelection coursesSelected coursesSelected={coursesSelected} setCoursesSelected={setCoursesSelected}/>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Crear Learning Path
      </Button>
      </Paper>
    </Box>
  );
};

export default LearningPathForm;
