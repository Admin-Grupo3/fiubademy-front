import React from "react";
import { Paper, Typography, Button } from "@mui/material";

interface ImageUploadProps {
  formData: {
    title: string;
    language: string;
    price: string;
    description: string;
    categories: { id: number; name: string }[];
    image: File | undefined;
    video: string;
  };
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ formData, handleImageUpload }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "10px", marginTop: "10px" }}>
        Subir imagen del curso
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
              accept="image/*"
              style={{ display: "none" }}
              id="image-input"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-input">
              <Button variant="contained" component="span">
                Subir Imagen
              </Button>
            </label>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ImageUpload;
