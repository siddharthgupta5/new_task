import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, Avatar, Button, TextField, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import ImageUpload from '../Upload/ImageUpload';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    photo: '',
    username: '',
    bio: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          return;
        }
        const response = await axios.get('/api/v1/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
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
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }
      await axios.put('/api/v1/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={profile.photo}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" component="h1">
              {profile.name}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={profile.username}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
            <Box mb={3}>
              <ImageUpload onUploadSuccess={handleImageUpload} />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;