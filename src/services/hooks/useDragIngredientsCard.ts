import { useDrag } from "react-dnd";
import { IIngredient } from "../types/burgerIngredients";

interface IIngredientsCard{
  card: IIngredient
}

function useDragIngredientsCard({ card }: IIngredientsCard) {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: card,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return {
    isDrag,
    dragRef
  }
}

export default useDragIngredientsCard;
