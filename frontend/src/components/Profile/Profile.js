import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ImageUpload from '../Upload/ImageUpload';
import { TextField, Button, Container, Typography, Box, Avatar } from '@material-ui/core';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    profilePicture: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/profile');
        setProfile(response.data.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (imageUrl) => {
    setProfile({
      ...profile,
      profilePicture: imageUrl
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.patch('/profile', {
        username: profile.username,
        bio: profile.bio
      });
      
      setProfile(response.data.data.user);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Failed to update profile' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          My Profile
        </Typography>
        {errors.general && (
          <Typography color="error" align="center">
            {errors.general}
        </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              src={profile.profilePicture}
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <Box mb={3}>
            <ImageUpload onUploadSuccess={handleImageUpload} />
          </Box>
          <TextField
            label="Username"
            name="username"
            value={profile.username || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email || ''}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bio"
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;