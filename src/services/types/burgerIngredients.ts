export interface IIngredient {
  _id: string;
  type: string;
  name: string;
  image: string;
  image_large: string;
  price: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
}

export interface IIngredientsState {
  ingredients: Array<IIngredient>;

  bun: Array<IIngredient>;
  main: Array<IIngredient>;
  sauce: Array<IIngredient>;

  loadingStatus: 'idle' | 'loading' | 'error',
  error: null | string,
}

export interface IIngredientsPayload {
  data?: Array<IIngredient>;
  success: boolean
  message: string;
}