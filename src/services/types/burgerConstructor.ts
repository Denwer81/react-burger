import { IIngredient } from "./burgerIngredients";

export interface IConstuctor extends IIngredient {
  consructorId: string
}

export interface IConstuctorState {
  cartBun: Array<IConstuctor>;
  cartIngredients: Array<IConstuctor>;
}
