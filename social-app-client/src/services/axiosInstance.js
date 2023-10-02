import axios from 'axios';
import { TOKEN_TYPES } from '../utils/constants';

const BASE_API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

// Attach accessToken to request headers
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);

  if (accessToken) {
    config.headers['x-access-token'] = accessToken;
  }

  return config;
});

export default api;
