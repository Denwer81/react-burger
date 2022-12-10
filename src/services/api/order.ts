import { baseUrlApi } from "../../utils/constants";
import { IOrderData, IOrderPayload } from "../types/order";
import { checkResponce } from "./checkResponce";

export const handleFetchOrder = async ({ accessToken, cardList }: IOrderData) => {
  const response = await fetch(baseUrlApi + 'orders', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(cardList),
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IOrderPayload;
}

export const handleFetchGetOrder = async (number: number) => {
  const response = await fetch(`${baseUrlApi}orders/${number}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })

  const checkedResponce = await checkResponce(response)

  return checkedResponce as IOrderPayload;
}