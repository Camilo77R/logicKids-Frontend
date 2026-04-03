import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ← Puerto 3000 según el README
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;