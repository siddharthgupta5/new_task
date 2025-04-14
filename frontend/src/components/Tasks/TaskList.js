import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  Typography, 
  Box,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get('/tasks');
        setTasks(response.data.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await API.patch(`/tasks/${taskId}`, {
        completed: !currentStatus
      });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.data.task : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        My Tasks
      </Typography>
      {!showForm ? (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowForm(true)}
          style={{ marginBottom: '20px' }}
        >
          Add New Task
        </Button>
      ) : (
        <TaskForm onAddTask={handleAddTask} onCancel={() => setShowForm(false)} />
      )}
      <List>
        {tasks.length === 0 ? (
          <Typography>No tasks found. Add a new task!</Typography>
        ) : (
          tasks.map(task => (
            <ListItem key={task._id} dense>
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggleComplete(task._id, task.completed)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default TaskList;