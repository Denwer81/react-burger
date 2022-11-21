import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { IConstuctor, IConstuctorState } from '../types/burgerConstructor';

const initialState: IConstuctorState = {
  cartBun: [],
  cartIngredients: [],
}

const burgerConstractorSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartBun: (state, action: PayloadAction<IConstuctor>) => {
      state.cartBun = [action.payload];
    },
    addIngredient: (state, action: PayloadAction<IConstuctor>) => {
      state.cartIngredients.push(action.payload);
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.cartBun = (
        state.cartBun.filter(item => item.consructorId !== action.payload));

      state.cartIngredients = (
        state.cartIngredients.filter(item => item.consructorId !== action.payload));
    },
    updateIngredient: (state, action: PayloadAction<Array<IConstuctor>>) => {
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