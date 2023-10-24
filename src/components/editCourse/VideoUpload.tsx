import React from "react";
import { Paper, Typography, Button } from "@mui/material";

interface ImageUploadProps {
  formData: {
    title: string;
    language: string;
    hours: string;
    price: string;
    description: string;
    category: string;
    image: File | undefined;
  };
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoUpload: React.FC<ImageUploadProps> = ({ formData, handleImageUpload }) => {
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" style={{ marginBottom: "10px" }}>
        Subir video al curso
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
              accept="video/*"
              style={{ display: "none" }}
              id="image-input"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-input">
              <Button variant="contained" component="span">
                Subir Videos
              </Button>
            </label>
          </div>
        )}
      </Paper>
    </Paper>
  );
};

export default VideoUpload;
