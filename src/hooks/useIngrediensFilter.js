import { useMemo } from "react";
import extractArray from "../utils/extractArray";

const useIngrediensFilter = (cards) => {
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

  return {
    bun,
    main,
    sauce
  }
}

export default useIngrediensFilter;
