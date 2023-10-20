import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postAction';

const initialState = {
  fetchPostPending: false,
  fetchPostError: null,
  posts: [],
  pagination: {},
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostPending = true;
        state.fetchPostError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.fetchPostPending = false;
        state.posts = [...state.posts, ...payload.posts];
        state.pagination = payload.pagination;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.fetchPostPending = true;
        state.fetchPostError = payload;
      });
  },
});

export default postSlice.reducer;
