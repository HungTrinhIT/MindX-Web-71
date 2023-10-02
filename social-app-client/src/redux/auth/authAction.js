import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthAPI from '../../services/AuthAPI';

export const fetchCurrentUser = createAsyncThunk(
  'fetchCurrentUser',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await AuthAPI.fetchCurrentUser();
      return fulfillWithValue(response.data);
    } catch (error) {
      console.error('fetch-current-user-failed:', error);
      rejectWithValue(error.data.message);
    }
  }
);
