import { useDispatch } from "react-redux";

const useClearData = () => {
  const dispatch = useDispatch();

  const clearData = (clear, timeout = 200) => {
    setTimeout(() => {
      clear && dispatch(clear());
    }, timeout)
  }

  return {
    clearData,
  }
};

export default useClearData;
