//cart list component, could reuse this on checkout page?

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, fetchUserCart } from '../store/slices/cartSlice';

const CartList = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);

  return (
    <div>
      <p>
        this will be a table of products, with the following: - thumbnail image
        of product - product name - price (individual item) - quantity, with "-"
        and "+" to adjust - subtotal (price * quantity) - delete icon
      </p>
    </div>
  );
};

export default CartList;
