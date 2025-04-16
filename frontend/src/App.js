import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import TaskList from './components/Tasks/TaskList';
import ImageUpload from './components/Upload/ImageUpload';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/profile" /> : <Auth />} />
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/profile" /> : <Auth />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/auth" />} />
        <Route path="/upload" element={isAuthenticated ? <ImageUpload /> : <Navigate to="/auth" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;