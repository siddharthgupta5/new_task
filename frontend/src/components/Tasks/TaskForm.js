import React, { useState } from 'react';
import API from '../../services/api';
import { 
  TextField, 
  Button, 
  Box,
  Typography
} from '@material-ui/core';

const TaskForm = ({ onAddTask, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!task.title) {
      setErrors({ title: 'Title is required' });
      return;
    }
    
    try {
      const response = await API.post('/tasks', task);
      onAddTask(response.data.data.task);
    } catch (error) {
      console.error('Error creating task:', error);
      setErrors({ general: 'Failed to create task' });
    }
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      {errors.general && (
        <Typography color="error">
          {errors.general}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Box mt={2}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            style={{ marginRight: '10px' }}
          >
            Save
          </Button>
          <Button 
            variant="outlined" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaskForm;