import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Button, MenuItem } from '@mui/material';

const categories = ["python", "data science", "aws", "design", "marketing", "web development"];

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log("Creating course with data: ", data);
  console.log(data.get('name'));
};

const NewCourse = () => {
  return (
    <NewCourseWrapper>
    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="name"
          name="name"
          label="Titulo"
        />
        <TextField
          required
          id="idioma"
          name='idioma'
          label="Idioma"
          defaultValue="English"
        />
        <TextField
          id="horas"
          name="horas"
          label="Horas estimadas"
          type="number"
        />
        <TextField
          id="importe"
          name='importe'
          label="Importe"
        />
        <TextField
          id="descripcion"
          name='descripcion'
          label="Descripcion del curso"
          defaultValue="Default Value"
        />
         <TextField
          id="categoria"
          name='categoria'
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear curso
            </Button>
    </Box>
    </NewCourseWrapper>
  );
}

const NewCourseWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
    font-size: 1.8rem;
  }
  background-color: var(--clr-white);
`;

export default NewCourse