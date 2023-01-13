//cart screen page

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartList from '../components/CartList';
import { fetchUserCart, addToCart } from '../store';
import { selectCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  // useEffect(() => {
  //   console.log('useEffect kicking in, babe');
  //   dispatch(fetchUserCart());
  // }, [dispatch]);

  return (
    <>
      <CartList />
      <p>MAIN CART PAGE</p>
      <p>subtotal: this will be the summary of all product subtotals</p>
      <p>shipping: this will be the shipping charge</p>
      <p>tax: this will be the tax </p>
      <p>order total: this will be the final price</p>
    </>
  );
};

export default Cart;
