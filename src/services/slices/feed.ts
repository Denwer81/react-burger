import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedState, TFeedPayload, WebsocketStatus } from './../types/feed';


const initialState: IFeedState = {
  wsStatus: WebsocketStatus.OFFLINE,
  wsError: '',

  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect: (state, action: PayloadAction<string>) => {
    },
    wsDisconnect: () => {
    },
    wsConnecting: (state) => {
      state.wsStatus = WebsocketStatus.CONNECTING
    },
    wsConnectionOpen: (state) => {
      state.wsStatus = WebsocketStatus.ONLINE
    },
    wsConnectionError: (state, action) => {
      state.wsStatus = WebsocketStatus.OFFLINE
      state.wsError = action.payload
    },
    wsConnetionClosed: () => {
      return initialState
    },
    wsMessage: (state, action: PayloadAction<TFeedPayload>) => {
      return { ...state, ...action.payload };
    },
  },
});

const { actions, reducer } = feedSlice;

export default reducer;
export const wsActions = actions;
export const {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsConnectionOpen,
  wsConnectionError,
  wsConnetionClosed,
  wsMessage,
} = actions;
