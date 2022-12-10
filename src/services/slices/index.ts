import { createSocketMiddleware } from './../middlewares/socketMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import ingredients from './burgerIngredients';
import viewedIngredient from './viewedIngredient';
import cart from './burgerConstructor'
import order from './order'
import auth from './auth'
import feed from './feed'
import { wsActions } from './feed';

const store = configureStore({
    reducer: {
        ingredients,
        viewedIngredient,
        cart,
        order,
        auth,
        feed,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(createSocketMiddleware(wsActions))
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
