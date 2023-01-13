//cart list component, could reuse this on checkout page?

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, fetchUserCart } from '../store/slices/cartSlice';

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const cartRows = cartItems.map((cartItem) => {
    return (
      <tr key={cartItem.id}>
        <td>{cartItem.title}</td>
        <td>{cartItem.price}</td>
        <td>delete button</td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        {cartItems && cartItems.length ? (
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
            {cartRows}
          </table>
        ) : (
          <p>Your cart is currently empty - start shopping!</p>
        )}
      </div>
    </div>
  );
};

export default CartList;
