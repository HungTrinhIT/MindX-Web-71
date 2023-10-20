import { createAsyncThunk } from '@reduxjs/toolkit';
import PostAPI from '../../services/PostAPI';

// Types
const FETCH_POSTS = 'app/FETCH_POSTS';

// Async actions
export const fetchPosts = createAsyncThunk(
  FETCH_POSTS,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = {
      page: payload?.page,
    };

    try {
      const apiResponse = await PostAPI.getAll(params);
      const payload = {
        posts: apiResponse.data.data,
        pagination: apiResponse.data.pagination,
      };

      return fulfillWithValue(payload);
    } catch (error) {
      console.log('fetch-posts-error:', error);
      rejectWithValue(error);
    }
  }
);
