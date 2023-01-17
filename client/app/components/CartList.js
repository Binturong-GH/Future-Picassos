//cart list component, could reuse this on checkout page?

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  fetchUserCart,
  deleteProduct,
  incrementOne,
  subtractOne,
  deleteFromCartDB,
  editCartDB,
  getLocalCart,
  setLocalCart,
} from "../store/slices/cartSlice";

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    } else {
      console.log("cartlist useeffect - not user, dispatching getlocalcart");
      dispatch(getLocalCart());
    }
  }, []);

  const cartRows = cartItems.map((cartItem) => {
    function handleSubtract() {
      dispatch(subtractOne(cartItem.id)).then(setLocalCart(cartItems));
      const req = {
        productId: cartItem.id,
        quantity: cartItem.quantity - 1,
      };
      if (user) {
        dispatch(editCartDB(req));
      }
      // else {
      //   dispatch(setLocalCart(cartItems));
      // }
    }

    function handleIncrement() {
      console.log("cartItem", cartItem);
      dispatch(incrementOne(cartItem.id));
      const req = {
        productId: cartItem.id,
        quantity: cartItem.quantity + 1,
      };
      if (user) {
        dispatch(editCartDB(req));
      } else {
        dispatch(setLocalCart(cartItems));
      }
    }
    return (
      <tr key={cartItem.id}>
        <td>{cartItem.title}</td>
        <td>${cartItem.price}</td>
        <td>
          <button onClick={handleSubtract}>subtract one</button>
        </td>
        <td>{cartItem.quantity}</td>
        <td>
          <button onClick={handleIncrement}>add one</button>
        </td>
        <td>{cartItem.quantity * cartItem.price}</td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteProduct(cartItem.id));
              if (user) {
                dispatch(deleteFromCartDB(cartItem));
              } else {
                dispatch(setLocalCart(cartItems));
              }
            }}
          >
            Remove from Cart
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        {cartItems && cartItems.length ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th> </th>
                <th>Quantity</th>
                <th> </th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{cartRows}</tbody>
          </table>
        ) : (
          <p>Your cart is currently empty - start shopping!</p>
        )}
      </div>
    </div>
  );
};

export default CartList;
