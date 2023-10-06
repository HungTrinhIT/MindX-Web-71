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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('here', response);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
