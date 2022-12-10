import { IWebsocketOrder } from '../services/types/feed';
import { IIngredient } from '../services/types/burgerIngredients';

export const sortOrder = (order: IWebsocketOrder, allIngredients: IIngredient[]) => {
  const ingredients: Array<IIngredient | undefined> = [];
  let sortedIngredients: Array<IIngredient> = [];

  const igredientsMap = (items: string[]) => {
    const map = new Map()

    for (const item of items) {
        map.set(item, map.has(item) ? map.get(item) + 1 : 1)
    }
    return map
  }

  const ingredientMap = igredientsMap(order.ingredients)

  order.ingredients.forEach(id =>
    ingredients.push(allIngredients.find((item) => item._id === id)),
  );

  const price = ingredients.reduce((acc: number, item) => acc + item!.price, 0,);

  ingredients.forEach((ingredient) => {
    const find = sortedIngredients.find(item => item._id === ingredient?._id);

    if (!find && ingredient) sortedIngredients.push(ingredient);
    sortedIngredients = sortedIngredients.slice(0, 6);
  });

  return {
    ingredientMap,
    sortedIngredients,
    price,
  }
}