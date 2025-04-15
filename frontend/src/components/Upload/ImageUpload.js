import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/v1/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (onUploadSuccess) {
        onUploadSuccess(response.data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
        >
          Choose Image
        </Button>
      </label>
      {file && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Selected: {file.name}
          </Typography>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;