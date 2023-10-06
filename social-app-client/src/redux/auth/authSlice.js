import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  error: null,
  currentUser: {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.currentUser = payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.isAuthenticated = false;
      state.currentUser = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
