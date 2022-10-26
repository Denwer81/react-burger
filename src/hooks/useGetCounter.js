import { useSelector } from "react-redux";

const useGetCounter = ({ card }) => {
  const cardsIdList = useSelector(state => state.cart.cartIngredientsIdList);

  const getCounter = () => {
    const counter = cardsIdList.filter((item => item === card._id)).length;
    return card.type === 'bun' ? counter / 2 : counter;
  }

  return {
    getCounter,
  }
}

export default useGetCounter;
