import { useState, useEffect } from "react";

const useCart = (cards) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const OrderIngredientsId = cards.map((item) => item._id);
    const OrderIngredientsPrice = cards.reduce((sum, item) => item.price + sum, 0);

    setCart(OrderIngredientsId)
    setPrice(OrderIngredientsPrice)
  }, [cards])

  return {
    cart,
    price
  }
}

export default useCart;
