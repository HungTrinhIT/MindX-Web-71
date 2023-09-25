import axios from 'axios';

const BASE_API_URL = 'https://social-app-server-p5cm.onrender.com/api/v1';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

export default api;
