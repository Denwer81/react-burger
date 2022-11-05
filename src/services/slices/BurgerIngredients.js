import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBurgersDB } from "../../utils/api";
import { checkResponseRedux } from "../../utils/handleFetch";
import { REQUEST_STATUS } from "../../utils/constants";

const initialState = {
  ingredients: [],

  bun: [],
  main: [],
  sauce: [],

  loadingStatus: 'idle',
  error: null,
}

export const fetchBurgersDB = createAsyncThunk(
  'ingredients/fetchBurgersDB',
  async (_, { rejectWithValue }) => {
    return await getBurgersDB()
      .then(res => checkResponseRedux(res, rejectWithValue));
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgersDB.pending, state => {
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchBurgersDB.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        state.ingredients = action.payload.data;
        state.bun = state.ingredients.filter((item) => item.type === 'bun');
        state.main = state.ingredients.filter((item) => item.type === 'main');
        state.sauce = state.ingredients.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchBurgersDB.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
        state.error = action.payload;
      })
  }
});

const { reducer } = ingredientsSlice;

export default reducer;
