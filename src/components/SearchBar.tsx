import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { CoursesContext } from '../context/courses_context';
import { CourseContextType } from '../@types/sideBarType';
import { JSX } from 'react/jsx-runtime';

export default function SearchBar() {
    const {courses} = React.useContext(CoursesContext)

    const handleCourseSelect = (event: any, value: any) => {
        const selectedCourse = courses.find(course => course.title === value);
        if (selectedCourse) {
            const courseId = selectedCourse.id;

            window.location.href = `courses/${courseId}`;
            console.log(`Curso seleccionado: ${value}`);
        }
        
    }

    return (
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="search-course"
          disableClearable
          options={courses.map((course) => course.title)}
          onChange={handleCourseSelect} // Añade este prop para manejar la selección de curso
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search course"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Stack>
    );
}