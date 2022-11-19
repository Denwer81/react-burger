import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleFetchBurgersDB } from "../api/burgerIngredients";
import { IIngredientsState, IIngredientsPayload } from '../types/burgerIngredients';
import { REQUEST_STATUS } from '../types/types'

const initialState: IIngredientsState = {
  ingredients: [],

  bun: [],
  main: [],
  sauce: [],

  loadingStatus: 'idle',
  error: null,
}

export const fetchBurgersDB = createAsyncThunk<IIngredientsPayload, undefined, {rejectValue: IIngredientsPayload}>(
  'ingredients/fetchBurgersDB',
  async (_, { rejectWithValue }) => {
    try {
      return await handleFetchBurgersDB()

    } catch (error) {
      return rejectWithValue({ success: false, message: (error as Error).message })
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgersDB.pending, (state, action) => {
        state.error = null;
        state.loadingStatus = REQUEST_STATUS.loading;
      })
      .addCase(fetchBurgersDB.fulfilled, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.idle;
        state.ingredients = action.payload.data!;
        state.bun = state.ingredients.filter((item) => item.type === 'bun');
        state.main = state.ingredients.filter((item) => item.type === 'main');
        state.sauce = state.ingredients.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchBurgersDB.rejected, (state, action) => {
        state.loadingStatus = REQUEST_STATUS.error;
        state.error = action.payload!.message;
      })
  }
});

const { reducer } = ingredientsSlice;

export default reducer;
