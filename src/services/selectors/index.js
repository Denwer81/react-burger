import { useSelector } from 'react-redux';

const useSelectors = () => {
  const ingredientsBun = useSelector(state => state.ingredients.bun);
  const ingredientsmain = useSelector(state => state.ingredients.main);
  const ingredientsSauce = useSelector(state => state.ingredients.sauce);
  const ingredientsLoadingStatus = useSelector(state => state.ingredients.loadingStatus);

  const cartBun = useSelector(state => state.cart.cartBun);
  const cartIngredients = useSelector(state => state.cart.cartIngredients);

  const orderName = useSelector(state => state.order.orderName);
  const orderNumber = useSelector(state => state.order.orderNumber);
  const orderLoadingStatus = useSelector((state) => state.order.loadingStatus)

  const viewedIngredient = useSelector((state) => state.viewedIngredient.ingredient)

  return {
    ingredientsBun,
    ingredientsmain,
    ingredientsSauce,
    ingredientsLoadingStatus,
    cartBun,
    cartIngredients,
    orderName,
    orderNumber,
    orderLoadingStatus,
    viewedIngredient
  }
}

export default useSelectors;
