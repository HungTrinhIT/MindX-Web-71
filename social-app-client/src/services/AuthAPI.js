import axiosInstance from './axiosInstance';

const AuthAPI = {
  login: (authValues) => {
    return axiosInstance.post('/auth/login', authValues);
  },
  register: (registerValues) => {
    return axiosInstance.post('/auth/register', registerValues);
  },
  fetchCurrentUser: () => {
    return axiosInstance.get('/auth/current-user');
  },
};

export default AuthAPI;
