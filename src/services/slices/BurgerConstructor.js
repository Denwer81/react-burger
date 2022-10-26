import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartBun: [],
  cartIngredients: [],
}

const burgerConstractorSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartBun: (state, action) => {
      state.cartBun = [action.payload];
    },
    addIngredient: (state, action) => {
      state.cartIngredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.cartBun = (
        state.cartBun.filter(item => item.consructorId !== action.payload));

      state.cartIngredients = (
        state.cartIngredients.filter(item => item.consructorId !== action.payload));
    },
    updateIngredient: (state, action) => {
      state.cartIngredients = action.payload
    },
    clearCart: () => {
      return initialState;
    },
  },
});

const { actions, reducer } = burgerConstractorSlice;

export default reducer;

export const {
  addCartBun,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  clearCart
} = actions;