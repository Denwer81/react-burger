import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";

const initialState = {
  orderName: {},
  loadingStatus: 'idle',
  orderNumber: null,
}

export const fetchCart = createAsyncThunk(
  'order/postOrder',
  async (cart) => {
    return await getOrder(cart);
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
      .addCase(fetchCart.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.orderName = action.payload.name;
        state.orderNumber = action.payload.order;
      })
      .addCase(fetchCart.rejected, state => {
        state.loadingStatus = 'error';
      })
  }
});

const { actions, reducer } = orderSlice;

export default reducer;
export const {
  clearOrder,
} = actions;
