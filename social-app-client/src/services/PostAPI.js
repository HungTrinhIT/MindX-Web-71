import api from './axiosInstance';

const PostAPI = {
  getAll: (params) => {
    const { limit = 10, page = 1, sort = 'desc' } = params;
    const url = `/posts?limit=${limit}&page=${page}&sort=${sort}`;
    return api.get(url);
  },
  getById: (id) => {
    const url = `/posts/${id}`;
    return api.get(url);
  },
  create: (body) => {
    const url = `/posts`;
    return api.post(url, body);
  },
};

export default PostAPI;
