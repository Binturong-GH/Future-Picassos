//cart screen page

import React from 'react';
import CartList from '../components/CartList';

const Cart = () => {
  return (
    <>
      <CartList />
      <p>subtotal: this will be the summary of all product subtotals</p>
      <p>shipping: this will be the shipping charge</p>
    </>
  );
};

export default Cart;
