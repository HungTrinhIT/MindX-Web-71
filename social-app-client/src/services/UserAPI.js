import api from './axiosInstance';

const UserAPI = {
  uploadAvatar: (body) => {
    const url = '/users/avatar';
    return api.put(url, body, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
};

export default UserAPI;
