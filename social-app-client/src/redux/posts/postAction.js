import { createAsyncThunk } from '@reduxjs/toolkit';
import PostAPI from '../../services/PostAPI';

// Types
const FETCH_POSTS = 'app/FETCH_POSTS';

// Async actions
export const fetchPosts = createAsyncThunk(
  FETCH_POSTS,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const apiResponse = await PostAPI.getAll();
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
