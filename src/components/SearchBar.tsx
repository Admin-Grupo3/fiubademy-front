import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { CoursesContext } from '../context/courses_context';
import { useEffect } from 'react';

export default function SearchBar() {
    const {courses} = React.useContext(CoursesContext)

    const [searchValue, setSearchValue] = React.useState('');
    
    const handleSearch = () => {
        if (searchValue.trim() !== '') {
          window.location.href = `/search?query=${encodeURIComponent(searchValue)}`;
        }

      
    };

    useEffect(() => {
      const handleKeyPress = (event: { key: string; keyCode: number; }) => {
        if (event.key === 'Enter' || event.keyCode === 13)  {
          handleSearch();
        }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [searchValue]);
    
    const handleCourseSelect = (event: any, value: any) => {
        const selectedCourse = courses.find((course: { title: any; }) => course.title === value);
        if (selectedCourse) {
            const courseId = selectedCourse.id;

            window.location.href = `/courses/${courseId}`;
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
          onChange={handleCourseSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search course"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        />
      </Stack>
    );
}
