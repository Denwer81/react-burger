import { IIngredient } from "./burgerIngredients";
import { REQUEST_STATUS } from "./types";

export interface IOrderState {
  orderName: null | string;
  orderNumber: null | number;

  loadingStatus: keyof typeof REQUEST_STATUS;
  error: null | string;
}

export interface IOrder {
  createdAt: string;
  ingredients: Array<IIngredient>;
  name: string;
  number: number;
  owner: {
    name: string;
    email: string;
  }
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderPayload {
  success: boolean;
  message: string;
  order?: IOrder;
  name?: string;
}

export interface IOrderData {
  cardList: { ingredients: string[] };
  accessToken: string;
}