import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import test_courses from '../utils/data.tsx';
import { JSX } from 'react/jsx-runtime';

export default function SearchBar() {
    const handleCourseSelect = (event: any, value: any) => {
        const selectedCourse = test_courses.find(course => course.course_name === value);
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
          options={test_courses.map((course) => course.course_name)}
          onChange={handleCourseSelect} 
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
