import React, { useState } from 'react';
import API from '../../services/api';
import { Button, Box, Typography, CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ImageUpload = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setIsUploading(true);
      setError(null);
      
      const response = await API.post('/upload/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.data.data.imageUrl);
      }
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <CircularProgress size={24} />
              <Box ml={1}>Uploading...</Box>
            </>
          ) : (
            'Upload Image'
          )}
        </Button>
      </label>
      {error && (
        <Typography color="error" style={{ marginTop: 8 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;