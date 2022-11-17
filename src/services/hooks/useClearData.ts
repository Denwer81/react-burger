import { PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useRedux";

const useClearData = () => {
  const dispatch = useAppDispatch();

  const clearData = (clear: () => PayloadAction, timeout: number = 200) => {
    setTimeout(() => {
      clear && dispatch(clear());
    }, timeout)
  }

  return {
    clearData,
  }
};

export default useClearData;
