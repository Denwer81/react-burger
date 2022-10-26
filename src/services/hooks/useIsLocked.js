// import { useState } from 'react';
import { useMemo } from "react";
import useSelectors from "../selectors";

const useIsLocked = () => {
  const { cartIngredients } = useSelectors();

  const isLocked = useMemo(() => {
    return cartIngredients.length === 0 ? false : true;
  }, [cartIngredients])

  return {
    isLocked,
  }
}

export default useIsLocked;
