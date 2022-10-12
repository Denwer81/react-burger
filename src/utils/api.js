import handleFetch from "./handleFetch";
import { baseUrlApi } from "./constants";

function getBurgersDB() {
  return handleFetch({ url: `${baseUrlApi}ingredients` })
}

function getOrder(cart) {
  return handleFetch({ url: `${baseUrlApi}orders`, method: 'POST' }, cart)
}

export {
  getBurgersDB,
  getOrder,
}
