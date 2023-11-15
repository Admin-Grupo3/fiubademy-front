import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

interface ContentProps {
  formData: {
    title: string;
    language: string;
    price: string;
    description: string;
    categories: { id: number; name: string }[];
    image: File | undefined;
    what_will_you_learn: string[],
    content: string[],
    video: string,
  };
  formSubmitted: boolean;
}

const Content: React.FC<ContentProps> = ({ formData, setFormData, formSubmitted }) => {
  const [contenidos, setContenidos] = useState<string[]>([""]);
  const [currentContent, setCurrentContent] = useState<string>("");
  const [learnContent, setLearnContent] = useState<string[]>([""]);
  const [currentLearnContent, setCurrentLearnContent] = useState<string>("");

  const handleContentChange = (value: string) => {
    setCurrentContent(value);
  };

  const handleLearnContentChange = (value: string) => {
    setCurrentLearnContent(value);
  };

  const addLearnContentField = () => {
    setLearnContent([...learnContent, currentLearnContent]);
    setFormData((prevFormData: { what_will_you_learn: any; }) => ({
      ...prevFormData,
      what_will_you_learn: [...prevFormData.what_will_you_learn, currentLearnContent],
    }));
    setCurrentLearnContent("");
  };
  const addContentField = () => {
    setContenidos([...contenidos, currentContent]);
    setFormData((prevFormData: { content: any; }) => ({
      ...prevFormData,
      content: [...prevFormData.content, currentContent],
    }));
    setCurrentContent("");
  };

  const removeContentField = (index: number) => {
    const newContenidos = [...contenidos];
    newContenidos.splice(index, 1);
    setContenidos(newContenidos);
    setFormData((prevFormData: { content: string | any[]; }) => ({
      ...prevFormData,
      content: [
        ...prevFormData.content.slice(0, index),
        ...prevFormData.content.slice(index + 1),
      ],
    }));
  };

  const removeLearnContentField = (index: number) => {
    const newContenidos = [...learnContent];
    newContenidos.splice(index, 1);
    setLearnContent(newContenidos);
    setFormData((prevFormData: { what_will_you_learn: string | any[]; }) => ({
      ...prevFormData,
      what_will_you_learn: [
        ...prevFormData.what_will_you_learn.slice(0, index),
        ...prevFormData.what_will_you_learn.slice(index + 1),
      ],
    }));
  };

  return (
    <div> 

    <Paper elevation={3} style={{ padding: "20px" }}>
      <div>
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
      What will you learn
      </Typography>
        {learnContent.map((contenido, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label={`Contenido ${index + 1}`}
                  variant="outlined"
                  value={index === 0 ? currentLearnContent : contenido}
                  onChange={(e) => handleLearnContentChange(e.target.value)}
                  disabled={index > 0}
                  error={formSubmitted && formData.what_will_you_learn.length === 1}
                  helperText={
                    formSubmitted && formData.what_will_you_learn.length === 1
                      ? "Al menos un contenido es requerido"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
              {index === 0 && (
                <IconButton onClick={addLearnContentField} size="large">
                  <AddIcon />
                </IconButton>
                )}
                {index > 0 && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => removeLearnContentField(index)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
               )}
               
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </Paper>
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
    <div>
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
Contenidos      </Typography>
        {contenidos.map((contenido, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label={`Contenido ${index + 1}`}
                  variant="outlined"
                  value={index === 0 ? currentContent : contenido}
                  onChange={(e) => handleContentChange(e.target.value)}
                  disabled={index > 0}
                  error={formSubmitted && formData.content.length === 1}
                  helperText={
                    formSubmitted && formData.content.length === 1
                      ? "Al menos un contenido es requerido"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
              {index === 0 && (
                <IconButton onClick={addContentField} size="large">
                  <AddIcon />
                </IconButton>
                )}
                {index > 0 && (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => removeContentField(index)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
               )}
               
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </Paper>

      </div>


    
    
  );
};

export default Content;
