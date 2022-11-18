import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../types/types";
import {
  IAuth,
  IAuthPayload,
  ILoginData,
  IRegisterData,
  ITokenData,
  IUpdateUserData
} from "../types/auth";
import {
  handleFetchGetUser,
  handleFetchLogin,
  handleFetchLogout,
  handleFetchRegister,
  handleFetchUpdateAccessToken,
  handleFetchUpdateUser
} from "../api/auth";

const initialState: IAuth = {
  isAuth: false,
  user: {
    email: "",
    name: "",
  },

  loadingStatus: 'idle',
  error: null,
}

export const fetchRegister = createAsyncThunk<IAuthPayload, IRegisterData, { rejectValue: IAuthPayload }>(
  'auth/fetchRegister',
  async (data, { rejectWithValue }) => {
    try {
      return await handleFetchRegister(data)

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

export const fetchLogin = createAsyncThunk<IAuthPayload, ILoginData, { rejectValue: IAuthPayload }>(
  'auth/fetchLogin',
  async (data, { rejectWithValue }) => {
    try {
      return await handleFetchLogin(data)

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

export const fetchLogout = createAsyncThunk<IAuthPayload, ITokenData, { rejectValue: IAuthPayload }>(
  'auth/fetchLogout',
  async (refreshToken, { rejectWithValue }) => {
    try {
      return await handleFetchLogout(refreshToken)

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

export const fetchGetUser = createAsyncThunk<IAuthPayload, ITokenData, { rejectValue: IAuthPayload }>(
  'auth/fetchGetUser',
  async (accessToken, { rejectWithValue }) => {
    try {
      return await handleFetchGetUser(accessToken)

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

export const fetchUpdateUser = createAsyncThunk<IAuthPayload, IUpdateUserData, { rejectValue: IAuthPayload }>(
  'auth/fetchUpdateUser',
  async ({ accessToken, data }, { rejectWithValue }) => {
    try {
      return await handleFetchUpdateUser({ accessToken, data })

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

export const fetchUpdateAccessToken = createAsyncThunk<IAuthPayload, ITokenData, { rejectValue: IAuthPayload }>(
  'auth/fetchUpdateAccessToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      return await handleFetchUpdateAccessToken(refreshToken)

    } catch (error: any) {
      return rejectWithValue({ success: false, message: error.message })
    }
  }
);

const setLoadinStatusPending = (state: IAuth, action: any) => {
  state.error = null;
  state.loadingStatus = REQUEST_STATUS.loading;
}

const setLoadinStatusRejected = (state: IAuth, action :any) => {
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
        if (action.payload.success && action.payload.user) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })

      .addCase(fetchLogin.pending, setLoadinStatusPending)
      .addCase(fetchLogin.rejected, setLoadinStatusRejected)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success && action.payload.user) {
          state.user = action.payload.user;
          state.isAuth = true;
        };
      })

      .addCase(fetchLogout.pending, setLoadinStatusPending)
      .addCase(fetchLogout.rejected, setLoadinStatusRejected)
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success)
          return initialState;
      })

      .addCase(fetchGetUser.pending, setLoadinStatusPending)
      .addCase(fetchGetUser.rejected, setLoadinStatusRejected)
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success && action.payload.user) {
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
        if (action.payload.success && action.payload.user) {
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
