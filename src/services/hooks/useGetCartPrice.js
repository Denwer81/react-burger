import { useMemo } from "react";
import useSelectors from "../selectors";

const useGetCartPrice = () => {
  const { cartBun, cartIngredients } = useSelectors();

  const cartPrice = useMemo(() => {
    const bunPrice = cartBun.length !== 0
      ? cartBun[0].price * 2
      : 0

    return cartIngredients.reduce((sum, item) => item.price + sum, bunPrice)
  }, [cartBun, cartIngredients])

  return {
    cartPrice,
  }
}

export default useGetCartPrice;
