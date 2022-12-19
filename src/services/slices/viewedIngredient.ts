import { IIngredient } from './../types/burgerIngredients';
import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { IViewedIngredient } from '../types/viewedIngredient';

const initialState: IViewedIngredient = {
  ingredient: {},
}

const viewedIngredientSlice = createSlice({
  name: 'viewedIngredient',
  initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.ingredient = action.payload;
    },
    clearIngredient: () => {
      return initialState;;
    }
  },
});

const { actions, reducer } = viewedIngredientSlice;

export default reducer;

export const {
  setIngredient,
  clearIngredient,
} = actions;
