import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleLogin,
  handleLogout,
  handleRegister,
  handleRefreshToken,
  handleResetPasswordFirst,
  handleResetPasswordSecond,
} from "../../utils/api";

const initialState = {
  isAuth: false,
  user: {
    email: "",
    name: ""
  },

  loadingStatus: 'idle',
}

export const fetchRegister = createAsyncThunk(
  'auth/fetchBurgersDB',
  async (data) => {
    return await handleRegister(data);
  }
);

export const fetchLogin = createAsyncThunk(
  'auth/fetchBurgersDB',
  async (data) => {
    return await handleLogin(data);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.user = action.payload.user;
      })
      .addCase(fetchRegister.rejected, state => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchLogin.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.user = action.payload.user;
      })
      .addCase(fetchLogin.rejected, state => {
        state.loadingStatus = 'error';
      })
  }
});

const { reducer } = authSlice;

export default reducer;
