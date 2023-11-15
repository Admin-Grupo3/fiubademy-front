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
    video: string
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formSubmitted: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ formData, formSubmitted, handleChange }) => {

  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
  const isLinkValid = (link: string) => linkRegex.test(link);

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
        error={formSubmitted && (!formData.video || !isLinkValid(formData.video))}
        helperText={
          formSubmitted && (!formData.video || !isLinkValid(formData.video))
            ? "Por favor, ingrese un enlace válido"
            : ""
        }
      />
    </Paper>
  );
};

export default VideoUpload;
