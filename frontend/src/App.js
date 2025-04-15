import React from 'react';
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/profile" /> : <Auth />,
    },
    {
      path: "/auth",
      element: isAuthenticated ? <Navigate to="/profile" /> : <Auth />,
    },
    {
      path: "/profile",
      element: isAuthenticated ? <Profile /> : <Navigate to="/auth" />,
    },
    {
      path: "/tasks",
      element: isAuthenticated ? <TaskList /> : <Navigate to="/auth" />,
    },
    {
      path: "/upload",
      element: isAuthenticated ? <ImageUpload /> : <Navigate to="/auth" />,
    },
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;