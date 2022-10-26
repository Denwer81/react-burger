import { useMemo } from "react";
import useGetCartIdList from "./useGetCartdList";

const useGetCounter = ({ card }) => {
  const { cartIdList } = useGetCartIdList();

  const getCounter = useMemo(() => {
    const counter = cartIdList.filter((item => item === card._id)).length;
    return card.type === 'bun' ? counter / 2 : counter;
  }, [cartIdList, card._id, card.type])

  return {
    getCounter,
  }
}

export default useGetCounter;
