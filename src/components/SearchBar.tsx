import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { CoursesContext } from '../context/courses_context';
import { useEffect } from 'react';
import { MenuItem, Select, Box } from '@mui/material';
const languages = ["All languages", "English", "Spanish"];

export default function SearchBar() {
    const coursesContext = React.useContext(CoursesContext);

    const courses = coursesContext ? coursesContext.courses : [];

    const [searchValue, setSearchValue] = React.useState('');
    const [selectedLanguage, setSelectedLanguage] = React.useState('All languages');

    const handleSearch = () => {
      let url = `/search?query=${encodeURIComponent(searchValue)}&language=${encodeURIComponent(selectedLanguage)}`;
      if (searchValue.trim() !== '') {
        window.location.href = url;
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
    }, [searchValue, selectedLanguage]);
    
    const handleCourseSelect = (event: any, value: any) => {
        
      const selectedCourse = courses.find((course: { title: any; }) => course.title === value);
        if (selectedCourse) {
            const courseId = selectedCourse.id;

            window.location.href = `/courses/${courseId}`;
            console.log(`Curso seleccionado: ${value}`);
        }
        
    }

    const handleLanguageChange = (event: any) => {
      setSelectedLanguage(event.target.value);
    };

    return (
      <Stack 
      display="flex"
      flexDirection="row"
      >
        <Autocomplete
        sx={{ flexGrow: 1 }}
          freeSolo
          id="search-course"
          disableClearable
          options={courses}
          getOptionLabel={(course) => course.title}
          onChange={(event, course) => handleCourseSelect(event, course.title)} 
          renderOption={(props, course, { selected }) => (
            <Box component="li" sx={{ display: 'flex', alignItems: 'center', height: '50px', color: '#000'}} {...props}>
              <img
                loading="lazy"
                style={{ width: '42px', height: '42px', marginRight: '10px', marginTop: '4px', marginBottom: '4px'}}
                src={`/src/assets/images/${course.image}.jpg`}
                alt=""
              />
              {course.title}
            </Box>
          )}
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
        <Select
        sx={{ width: 110 }}
        defaultValue="All languages"
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        {languages.map((language: string) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
      </Stack>
    );
}
