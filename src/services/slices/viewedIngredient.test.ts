import reducer, { setIngredient } from './viewedIngredient';

const initialState = {
  ingredient: {},
}

const testIngredient = {
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

describe('viewedIngredient slice', () => {
  test("Should return the initial state", () => {
    expect(reducer(undefined, {type: {}})).toEqual(initialState)
  });
  
  test("Should set the viewedIngredient", () => {
    const state = reducer(initialState, setIngredient(testIngredient))

    expect(state).toEqual(({
      ingredient: testIngredient,
    }))
  });
})
