import { configureStore } from '@reduxjs/toolkit';
import ingredients from './BurgerIngredients';
import viewedIngredient from './viewedIngredient';
import cart from './BurgerConstructor'
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

export default store;