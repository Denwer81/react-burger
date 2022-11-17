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

// export const handleFetchOrder = async ({ accessToken, cardList }: IOrderData) => {
//   const response = await fetch(baseUrlApi + 'orders', {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': accessToken,
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(cardList),
//   })

//   if (!response.ok) {
//     if (response.status === 404) {
//       throw new Error('Server Error!')
//     } else {
//       const error = await response.json() as IOrderPayload;
//       throw new Error(error.message)
//     }
//   }

//   return await response.json() as IOrderPayload
// }

// const checkResponce = async (response: Response) => {
//   if (!response.ok) {
//     if (response.status === 404) {
//       throw new Error('Server Error!')
//     } else {
//       const error = await response.json()
//       throw new Error(error.message)
//     }
//   }

//   return await response.json()
// }
