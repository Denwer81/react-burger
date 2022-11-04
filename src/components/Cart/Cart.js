import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchCart } from '../../services/slices/order';
import { getCartIdList, getCartPrice } from '../../services/selectors/selectors';
import { useLocation, useNavigate } from "react-router-dom";
import { getIsAuth } from '../../services/selectors/selectors';
import { getCookie } from '../../utils/handleCookie';

import styles from './Cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDisable, setIsDisable] = useState(false);
  const cartIdList = useSelector(getCartIdList);
  const cartPrice = useSelector(getCartPrice);
  const isAuth = useSelector(getIsAuth);
  const accessToken = getCookie('accessToken');

  const handleGetOrder = async () => {
    if (!isAuth) {
      navigate('/login')
    } else {
      if (cartIdList.length !== 0) {
        setIsDisable(true);
        const cardList = { ingredients: cartIdList };
        const order = await dispatch(fetchCart({ cardList, accessToken }));
        const orderNumber = order.payload.order.number;

        setIsDisable(false);
        navigate(`/profile/orders/${orderNumber}`,
          { state: { background: location } })
      }
    }
  };

  return (
    <div className={`${styles.container} mt-10`}>
      <p className='text text_type_main-large'>{cartPrice}</p>
      <div className='ml-2 mr-10'>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        onClick={handleGetOrder}
        type="primary"
        size="large"
        htmlType='button'
        disabled={isDisable}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Cart;
