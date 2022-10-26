import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
  ingredient: [],
}

const viewedIngredientSlice = createSlice({
  name: 'viewedIngredient',
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    clearIngredient: (state) => {
      state.ingredient = [];
    }
  },
});

const { actions, reducer } = viewedIngredientSlice;

export default reducer;

export const {
  setIngredient,
  clearIngredient,
} = actions;
