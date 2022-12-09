import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from "../slices";

export const getAllIngredients = (state: RootState) => state.ingredients.ingredients
export const getIngredientsBun = (state: RootState) => state.ingredients.bun
export const getIngredientsMain = (state: RootState) => state.ingredients.main
export const getIngredientsSauce = (state: RootState) => state.ingredients.sauce
export const getIngredientsLoadingStatus = (state: RootState) => state.ingredients.loadingStatus

export const getCartBun = (state: RootState) => state.cart.cartBun
export const getCartIngredients = (state: RootState) => state.cart.cartIngredients

export const getOrderName = (state: RootState) => state.order.orderName
export const getOrderNumber = (state: RootState) => state.order.orderNumber
export const getOrderLoadingStatus = (state: RootState) => state.order.loadingStatus
export const getOrderError = (state: RootState) => state.order.error

export const getViewedIngredient = (state: RootState) => state.viewedIngredient.ingredient

export const getIsAuth = (state: RootState) => state.auth.isAuth
export const getUser = (state: RootState) => state.auth.user
export const getAuthError = (state: RootState) => state.auth.error

export const getFeedOrders = (state: RootState) => state.feed.orders
export const getFeedTotal = (state: RootState) => state.feed.total
export const getFeedTotalToday = (state: RootState) => state.feed.totalToday

export const getCounters = createSelector(getCartIngredients, getCartBun,
  (getCartIngredients, getCartBun) => {
    const counters: { [name: string]: number } = {};

    [...getCartIngredients, ...getCartBun].forEach(item => {
      if (!counters[item._id]) counters[item._id] = 0
      item.type === 'bun' ? counters[item._id] = 2 : ++counters[item._id]
    })
    return counters;
  }
);

export const getCartIdList = createSelector(getCartIngredients, getCartBun,
  (getCartIngredients, getCartBun) => {
    const cartIngredientsId = getCartIngredients.map(item => item._id);
    const cartBunId = getCartBun.map(item => item._id);

    return [...cartBunId, ...cartIngredientsId, ...cartBunId];
  }
);

export const getCartPrice = createSelector(getCartIngredients, getCartBun,
  (getCartIngredients, getCartBun) => {
    const bunPrice = getCartBun.length !== 0
      ? getCartBun[0].price * 2
      : 0

    return getCartIngredients.reduce((sum, item) => item.price + sum, bunPrice);
  }
);

export const getIsLocked = createSelector(getCartIngredients,
  (getCartIngredients) => {
    return getCartIngredients.length === 0 ? false : true;
  }
);
