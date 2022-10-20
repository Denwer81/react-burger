import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartBun: {},
  cartIngredients: [],
  cartIngredientsIdList: [],

  totalSumIngredients: 0,
  totalSumBun: 0,
}

const burgerConstractorSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartBun: (state, action) => {
      state.cartBun = action.payload;
    },
    addIngredient: (state, action) => {
      state.cartIngredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      const cartBun = [state.cartBun].filter(item => item.consructorId !== action.payload);

      state.cartBun = cartBun.length !== 0 ? state.cartBun : {};

      state.cartIngredients = (
        state.cartIngredients.filter(item => item.consructorId !== action.payload));
    },
    cartIngredientsIdList: (state) => {
      const ingredientsIdList = state.cartIngredients.map(item => item._id)
      const cartBunId = state.cartBun.hasOwnProperty('_id') ? state.cartBun._id : [];
    
      state.cartIngredientsIdList = (
        [...cartBunId, ...cartBunId, ...ingredientsIdList]);
    },
    totalSumIngredients: (state) => {
      const bunPrice = state.cartBun.hasOwnProperty('price') ? state.cartBun.price : 0;

      state.totalSumIngredients = (
        state.cartIngredients.reduce((sum, item) => item.price + sum, bunPrice));
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
  cartIngredientsIdList,
  totalSumIngredients,
} = actions;