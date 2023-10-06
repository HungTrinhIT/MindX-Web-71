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
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
