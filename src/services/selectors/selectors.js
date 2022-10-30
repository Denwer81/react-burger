import { createSelector } from '@reduxjs/toolkit'

export const getIngredientsBun = state => state.ingredients.bun
export const getIngredientsMain = state => state.ingredients.main
export const getIngredientsSauce = state => state.ingredients.sauce
export const getIngredientsLoadingStatus = state => state.ingredients.loadingStatus

export const getCartBun = state => state.cart.cartBun
export const getCartIngredients = state => state.cart.cartIngredients

export const getOrderName = state => state.order.orderName
export const getOrderNumber = state => state.order.orderNumber
export const getOrderLoadingStatus = state => state.order.loadingStatus

export const getViewedIngredient = state => state.viewedIngredient.ingredient

export const getIsAuth = state => state.auth.isAuth
export const getUser = state => state.auth.user
export const getAuthError = state => state.auth.error

export const getCounters = createSelector(getCartIngredients, getCartBun,
  (getCartIngredients, getCartBun) => {
    const counters = {};

    [...getCartIngredients, ...getCartBun].forEach(item => {
      if (!counters[item._id]) counters[item._id] = 0
      ++counters[item._id]
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
      ? getCartBun.at(0).price * 2
      : 0
    
    return getCartIngredients.reduce((sum, item) => item.price + sum, bunPrice);
  }
);

export const getIsLocked = createSelector(getCartIngredients,
  (getCartIngredients) => {
    return getCartIngredients.length === 0 ? false : true;
  }
);
