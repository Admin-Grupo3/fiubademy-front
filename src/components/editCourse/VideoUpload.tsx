import React from "react";
import { Paper, Typography, TextField } from "@mui/material";

interface VideoUploadProps {
  formData: {
    title: string;
    language: string;
    price: string;
    description: string;
    categories: {id: number, name: string}[];
    image: File | undefined;
    what_will_you_learn: string[];
    content: string[];
    video: string;
  };
  formSubmitted: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const VideoUpload: React.FC<VideoUploadProps> = ({ formData, formSubmitted, handleChange }) => {

  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "10px" }}>
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Subir video al curso
      </Typography>
      
      <TextField
          required
          id="video"
          label="Link al video"
          name="video"
          fullWidth
          onChange={handleChange}
          margin="normal"
          value={formData.video}          
          error={formSubmitted && formData.video === ""}
          helperText={
            formSubmitted && formData.video === ""
              ? "Este campo es requerido"
              : ""
          }
        />  
    </Paper>
  );
};

export default VideoUpload;
