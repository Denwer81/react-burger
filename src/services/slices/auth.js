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
  'auth/fetchLogout',
  async (refreshToken, { rejectWithValue }) => {
    return await handleLogout(refreshToken)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchGetUser = createAsyncThunk(
  'auth/fetchGetUser',
  async (accessToken, { rejectWithValue }) => {
    return await handleGetUser(accessToken)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchUpdateAccessToken = createAsyncThunk(
  'auth/fetchUpdateAccessToken',
  async (accessToken, { rejectWithValue }) => {
    return await handleUpdateAccessToken(accessToken)
      .then(res => checkResponseRedux(res, rejectWithValue))
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async ({ accessToken, values }, { rejectWithValue }) => {
    return await handleUpdatetUser({ accessToken, values })
      .then(res => checkResponseRedux(res, rejectWithValue))
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
      .addCase(fetchRegister.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
      .addCase(fetchLogin.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
      .addCase(fetchLogout.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success === true)
          return initialState;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
      .addCase(fetchGetUser.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
      .addCase(fetchUpdateAccessToken.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchUpdateAccessToken.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
      })
      .addCase(fetchUpdateAccessToken.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
      .addCase(fetchUpdateUser.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
      })
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
  setError,
} = actions;
