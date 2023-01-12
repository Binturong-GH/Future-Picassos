//cart screen page

import React from 'react';
import CartList from '../components/CartList';

const Cart = () => {
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
