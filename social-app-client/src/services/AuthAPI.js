import api from './axiosInstance';

const AuthAPI = {
  signUp: (body) => {
    const url = '/auth/signup';
    return api.post(url, body);
  },
  login: (body) => {
    const url = '/auth/login';
    return api.post(url, body);
  },
  fetchCurrentUser: () => {
    const url = '/auth/current-user';
    return api.get(url);
  },
};

export default AuthAPI;
