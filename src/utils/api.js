import handleFetch from "./handleFetch";
import { baseUrlApi } from "./constants";

function getBurgersDB() {
  return handleFetch({ url: `${baseUrlApi}` })
}

export {
  getBurgersDB,
}
