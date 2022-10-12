import { useMemo } from "react"

const useIngrediensFilter = (cards) => {
  const extractArray = (value) => {
    return Array.isArray(value) ? value : (value !== undefined ? [value] : [])
  };

  const bun = useMemo(
    () => cards.filter((item) => item.type === 'bun'),
    [cards]
  );

  const main = useMemo(
    () => extractArray(cards.filter((item) => item.type === 'main')),
    [cards]
  );

  const sauce = useMemo(
    () => extractArray(cards.filter((item) => item.type === 'sauce')),
    [cards]
  );

  const burgerConstractorBun = useMemo(
    () => bun[0],
    [bun]
  );

  const burgerConstractorFilling = useMemo(
    () => {
      return [...main, ...sauce] 
    },
    [main, sauce]
  );

  const burgerConstractorIngreduents = useMemo(
    () => {
      return [
        ...extractArray(burgerConstractorBun),
        ...burgerConstractorFilling,
        ...extractArray(burgerConstractorBun)]
    },
    [burgerConstractorBun, burgerConstractorFilling]
  )

  const orderIngredientsId = useMemo(
    () => {
      return burgerConstractorIngreduents.map((item) => item._id);
    },
    [burgerConstractorIngreduents]
  )

  const orderIngredientsPrice = useMemo(
    () => {
      return burgerConstractorIngreduents.reduce((sum, item) => item.price + sum, 0);
    },
    [burgerConstractorIngreduents]
  )

  return {
    bun,
    main,
    sauce,
    burgerConstractorBun,
    burgerConstractorFilling,
    burgerConstractorIngreduents,
    orderIngredientsId,
    orderIngredientsPrice
  }
}

export default useIngrediensFilter;
