import { configureStore } from '@reduxjs/toolkit';
import ingredients from './burgerIngredients';
import viewedIngredient from './viewedIngredient';
import cart from './burgerConstructor'
import order from './order'
import auth from './auth'

const store = configureStore({
    reducer: {
        ingredients,
        viewedIngredient,
        cart,
        order,
        auth
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
