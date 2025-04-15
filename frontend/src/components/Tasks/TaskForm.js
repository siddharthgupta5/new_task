import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const TaskForm = ({ task, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (task) {
        await axios.put(`/api/v1/tasks/${task._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/v1/tasks', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        {task ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default TaskForm;