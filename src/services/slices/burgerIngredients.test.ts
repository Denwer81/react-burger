import { IIngredientsState } from '../types/burgerIngredients';
import { REQUEST_STATUS } from '../types/types';
import reducer, { fetchBurgersDB } from './burgerIngredients';

const initialState: IIngredientsState = {
  ingredients: [],

  bun: [],
  main: [],
  sauce: [],

  loadingStatus: 'idle',
  error: null,
}

const bun = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const main = {
  _id: "60d3b41abdacab0026a733cb",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0
};

const sauce = {
  _id: "60d3b41abdacab0026a733cc",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  __v: 0
};

describe('burgerIngredients slice', () => {
  test("Should set sets burgerIngredients checkout is pending", () => {
    const action = { type: fetchBurgersDB.pending.type }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: null,
      loadingStatus: REQUEST_STATUS.loading
    })
  });

  test("Should set sets burgerIngredients checkout is fulfilled", () => {
    const action = {
      type: fetchBurgersDB.fulfilled.type,
      payload: {
        data: [bun, main, sauce]
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      loadingStatus: REQUEST_STATUS.idle,
      ingredients: [bun, main, sauce],
      bun: [bun],
      main: [main],
      sauce: [sauce],
    })
  });

  test("Should set sets burgerIngredients checkout is rejected", () => {
    const action = {
      type: fetchBurgersDB.rejected.type,
      payload: {
        message: 'error'
      }
    }
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'error',
      loadingStatus: REQUEST_STATUS.error
    })
  });
})