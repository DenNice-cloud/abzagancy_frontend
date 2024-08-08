import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  // console.log('Token being sent:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Token being sent:', config.headers.Authorization);

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
