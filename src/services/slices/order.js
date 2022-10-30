import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";
import { checkResponseRedux } from "../../utils/handleFetch";


const initialState = {
  orderName: {},
  orderNumber: null,

  loadingStatus: 'idle',
  error: null,
}

export const fetchCart = createAsyncThunk(
  'order/postOrder',
  async (cart, {rejectWithValue}) => {
    return await getOrder(cart)
    .then(res => checkResponseRedux(res, rejectWithValue))
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
      .addCase(fetchCart.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.payload;
      })
  }
});

const { actions, reducer } = orderSlice;

export default reducer;
export const {
  clearOrder,
} = actions;
