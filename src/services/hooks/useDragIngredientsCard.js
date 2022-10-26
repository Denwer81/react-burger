import { useDrag } from "react-dnd";

function useDragIngredientsCard({ card }) {
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