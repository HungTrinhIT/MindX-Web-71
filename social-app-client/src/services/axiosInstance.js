import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api/v1/';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken') || '';

  if (accessToken) {
    config.headers['x-access-token'] = accessToken;
  }

  return config;
});

export default api;
