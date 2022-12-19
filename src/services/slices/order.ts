import { IGetOrderPayload } from './../types/order';
import { handleFetchOrder, handleFetchGetOrder } from './../api/order';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderState, IOrderPayload, IOrderData } from '../types/order';
import { REQUEST_STATUS } from "../types/types";

const initialState: IOrderState = {
  orderName: undefined,
  orderNumber: undefined,

  loadingStatus: 'idle',
  error: null,
}

export const fetchPostOrder = createAsyncThunk<IOrderPayload, IOrderData, { rejectValue: IOrderPayload }>(
  'order/postOrder',
  async ({ cardList, accessToken }, { rejectWithValue }) => {
    try {
      return await handleFetchOrder({ cardList, accessToken })

    } catch (error) {
      return rejectWithValue({ success: false, message: (error as Error).message })
    }
  }
);

export const fetchGetOrder = createAsyncThunk<IGetOrderPayload, number, { rejectValue: IGetOrderPayload }>(
  'order/getOrder',
  async (number, { rejectWithValue }) => {
    try {
      return await handleFetchGetOrder(number)

    } catch (error) {
      return rejectWithValue({ success: false, message: (error as Error).message })
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostOrder.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.orderName = action.payload.name!;
          state.orderNumber = action.payload.order!.number;
        }
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
        state.error = action.payload!.message;
      })

      .addCase(fetchGetOrder.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.orderName = action.payload.orders?.[0].name
          state.orderNumber = action.payload.orders?.[0].number
        }
      })
      .addCase(fetchGetOrder.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
        state.error = action.payload!.message;
      })
  }
});

const { actions, reducer } = orderSlice;

export default reducer;
export const {
  clearOrder,
} = actions;
