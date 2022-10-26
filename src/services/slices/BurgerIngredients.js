import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBurgersDB } from "../../utils/api";

const initialState = {
  ingredients: [],

  bun: [],
  main: [],
  sauce: [],

  loadingStatus: 'idle',
}

export const fetchBurgersDB = createAsyncThunk(
  'ingredients/fetchBurgersDB',
  async () => {
    return await getBurgersDB();
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgersDB.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchBurgersDB.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.ingredients = action.payload.data;
        state.bun = state.ingredients.filter((item) => item.type === 'bun');
        state.main = state.ingredients.filter((item) => item.type === 'main');
        state.sauce = state.ingredients.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchBurgersDB.rejected, state => {
        state.loadingStatus = 'error';
      })
  }
});

const { reducer } = ingredientsSlice;

export default reducer;
