import { baseUrlApi } from "../../utils/constants";
import { IIngredientsPayload } from "../types/burgerIngredients";
import { checkResponce } from "./checkResponce";

export const handleFetchBurgersDB = async () => {
  const response = await fetch(baseUrlApi + 'ingredients', {
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

  return checkedResponce as IIngredientsPayload;
}
