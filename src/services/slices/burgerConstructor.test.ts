import reducer, {
  addCartBun,
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from './burgerConstructor';
import { IConstuctorState } from '../types/burgerConstructor';

const initialState: IConstuctorState = {
  cartBun: [],
  cartIngredients: [],
}

const testBun = {
  consructorId: 'testBun',
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

const testIngredient = {
  consructorId: 'testIngredient',
  _id: "60d3b41abdacab0026a733c8",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v: 0
}

describe('cart slice', () => {
  test("Should return the initial state", () => {
    expect(reducer(undefined, { type: {} })).toEqual(initialState)
  })

  test("Should add bun to cart", () => {
    const state = reducer(initialState, addCartBun(testBun))

    expect(state).toEqual({
      ...initialState,
      cartBun: [testBun]
    })
  })

  test("Should add ingredient to cart", () => {
    const state = reducer(initialState, addIngredient(testIngredient))

    expect(state).toEqual({
      ...initialState,
      cartIngredients: [testIngredient]
    })
  })

  test("Should delete bun from cart", () => {
    const previouseState = {
      ...initialState,
      cartBun: [testBun],
    }
    const state = reducer(previouseState, deleteIngredient('testBun'))

    expect(state).toEqual({
      ...initialState,
    })
  })

  test("Should delete ingredient from cart", () => {
    const previouseState = {
      ...initialState,
      cartIngredients: [testIngredient],
    }
    const state = reducer(previouseState, deleteIngredient('testIngredient'))

    expect(state).toEqual({
      ...initialState,
    })
  })

  test("Should update ingredients from cart", () => {
    const previouseState = {
      ...initialState,
      cartIngredients: [testIngredient],
    }
    const state = reducer(previouseState, updateIngredient([testBun]))

    expect(state).toEqual({
      ...initialState,
      cartIngredients: [testBun],
    })
  })
})
