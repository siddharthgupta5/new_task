import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
});

// Request interceptor for adding the bearer token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;