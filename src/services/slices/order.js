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
  async ({ cardList, accessToken }, { rejectWithValue }) => {
    return await getOrder({ cardList, accessToken })
      .then(res => checkResponseRedux(res, rejectWithValue))
      .catch(res => console.log(res))
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
        state.error = null;
        state.loadingStatus = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        console.log(action.payload)
        if (action.payload.success) {
          state.orderName = action.payload.name;
          state.orderNumber = action.payload.order;
        } else {
          state.error = action.payload.message
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.payload.message;
      })
  }
});

const { actions, reducer } = orderSlice;

export default reducer;
export const {
  clearOrder,
} = actions;
