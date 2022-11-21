import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IOrderState, IOrderPayload, IOrderData } from '../types/order';
import { REQUEST_STATUS } from "../types/types";
import { handleFetchOrder } from "../api/order";

const initialState: IOrderState = {
  orderName: null,
  orderNumber: null,

  loadingStatus: 'idle',
  error: null,
}

export const fetchOrder = createAsyncThunk<IOrderPayload, IOrderData, { rejectValue: IOrderPayload }>(
  'order/postOrder',
  async ({ cardList, accessToken }, { rejectWithValue }) => {
    try {
      return await handleFetchOrder({ cardList, accessToken })

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
      .addCase(fetchOrder.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        if (action.payload.success) {
          state.orderName = action.payload.name!;
          state.orderNumber = action.payload.order!.number;
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
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
