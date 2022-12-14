import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useNavigate, useLocation } from "react-router-dom";
import { getCartIdList, getIsAuth } from "../selectors/selectors";
import { getCookie } from "../../utils/handleCookie";
import { fetchPostOrder } from "../slices/order";
import useAuth from "./useAuth";

const useOrder = () => {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartIdList = useAppSelector(getCartIdList);
  const isAuth = useAppSelector(getIsAuth);
  const { updateAccessToken } = useAuth();

  const handleGetOrder = async () => {
    if (!isAuth) {
      navigate('/login')
    } else {
      if (cartIdList.length !== 0) {
        const accessToken = getCookie('accessToken');
        setIsDisableButton(true);

        if (accessToken) {
          const cardList: { ingredients: string[] } = { ingredients: cartIdList };
          const respose = await dispatch(fetchPostOrder({ cardList, accessToken }));

          if (respose.payload) {
            if (respose.payload.message === 'jwt expired') {
              updateAccessToken(handleGetOrder)
            }
            if (respose.payload.success) {
              const orderNumber = respose.payload.order!.number;

              if (orderNumber) {
                navigate(`/orders/${orderNumber}`,
                  { state: { background: location } })
              }
            }
          }
        }
        setIsDisableButton(false);
      }
    }
  }
  return {
    handleGetOrder, isDisableButton
  }
}

export default useOrder;
