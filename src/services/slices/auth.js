import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponseRedux, checkResponseReact } from "../../utils/handleFetch";
import {
  handleLogin,
  handleLogout,
  handleRegister,
  handleRefreshToken,
} from "../../utils/api";

const initialState = {
  isAuth: false,
  user: {
    email: "",
    name: ""
  },

  loadingStatus: 'idle',
  error: null,
}


export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (data, { rejectWithValue }) => {
    return await handleRegister(data)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (data, { rejectWithValue }) => {
    return await handleLogin(data)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchLogout = createAsyncThunk(
  'auth/handleLogout',
  async (data) => {
    return await handleLogout(data)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res;
      })
  }
);

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
      .addCase(fetchRegister.pending, state => {
        state.error = null;
        state.loadingStatus = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchRegister.rejected, state => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchLogin.pending, state => {
        state.error = null;
        state.loadingStatus = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchLogin.rejected, state => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchLogout.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = 'loading';
      })
      .addCase(fetchLogout.fulfilled, (action) => {
        console.log(action.payload)
        // return initialState;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loadingStatus = 'error';
      })
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
  setError,
} = actions;
