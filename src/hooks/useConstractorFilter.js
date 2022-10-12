import { useMemo } from "react";
import extractArray from "../utils/extractArray";

const useConstractorFilter = ({ bun, main, sauce }) => {
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

  return {
    burgerConstractorBun,
    burgerConstractorFilling,
    burgerConstractorIngreduents,
  }
}

export default useConstractorFilter;