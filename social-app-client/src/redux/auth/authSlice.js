import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser } from './authAction';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.isAuthenticated = false;
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.userInfo = payload;

        state.isAuthenticated = true;
        state.loading = false;
      }),
      builder.addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
