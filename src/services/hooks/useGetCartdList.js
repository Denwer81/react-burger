import { useMemo } from "react";
import useSelectors from "../selectors";

const useGetCartIdList = () => {
  const { cartBun, cartIngredients } = useSelectors();

  const cartIdList = useMemo(() => {
    const cartIngredientsId = cartIngredients.map(item => item._id)
    const cartBunId = cartBun.map(item => item._id);

    return [...cartBunId, ...cartIngredientsId, ...cartBunId]
  }, [cartBun, cartIngredients])

  return {
    cartIdList,
  }
}

export default useGetCartIdList;
