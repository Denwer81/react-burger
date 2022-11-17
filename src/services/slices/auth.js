import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponseRedux } from "../../utils/handleFetch";
import { REQUEST_STATUS } from "../../utils/constants";
import {
  handleLogin,
  handleLogout,
  handleGetUser,
  handleRegister,
  handleUpdatetUser,
  handleUpdateAccessToken,
} from "../../utils/api";

const initialState = {
  isAuth: false,
  user: {
    email: "",
    name: "",
  },

  loadingStatus: 'idle',
  error: null,
}

const fetchingAsyncThunk = (caseName, fn) => createAsyncThunk(
  caseName,
  async (data, { rejectWithValue }) => {
    return await fn(data)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchRegister = fetchingAsyncThunk('auth/fetchRegister', handleRegister)

export const fetchLogin = fetchingAsyncThunk('auth/fetchLogin', handleLogin)

export const fetchUpdateUser = fetchingAsyncThunk('auth/fetchUpdateUser', handleUpdatetUser)

export const fetchLogout = fetchingAsyncThunk('auth/fetchLogout', handleLogout)

export const fetchGetUser = fetchingAsyncThunk('auth/fetchGetUser', handleGetUser)

export const fetchUpdateAccessToken = fetchingAsyncThunk('auth/fetchUpdateAccessToken', handleUpdateAccessToken)

const setLoadinStatusPending = (state, action) => {
  state.error = null;
  state.loadingStatus = REQUEST_STATUS.loading;
}

const setLoadinStatusRejected = (state, action) => {
  state.error = action.payload.message;
  state.loadingStatus = REQUEST_STATUS.error;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, setLoadinStatusPending)
      .addCase(fetchRegister.rejected, setLoadinStatusRejected)
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })

      .addCase(fetchLogin.pending, setLoadinStatusPending)
      .addCase(fetchLogin.rejected, setLoadinStatusRejected)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })

      .addCase(fetchLogout.pending, setLoadinStatusPending)
      .addCase(fetchLogout.rejected, setLoadinStatusRejected)
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success === true)
          return initialState;
      })

      .addCase(fetchGetUser.pending, setLoadinStatusPending)
      .addCase(fetchGetUser.rejected, setLoadinStatusRejected)
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })

      .addCase(fetchUpdateAccessToken.pending, setLoadinStatusPending)
      .addCase(fetchUpdateAccessToken.rejected, setLoadinStatusRejected)
      .addCase(fetchUpdateAccessToken.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
      })

      .addCase(fetchUpdateUser.pending, setLoadinStatusPending)
      .addCase(fetchUpdateUser.rejected, setLoadinStatusRejected)
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
  setError,
} = actions;
