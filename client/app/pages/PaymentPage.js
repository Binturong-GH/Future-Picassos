import React from "react";
import PaymentForm from "../components/PaymentForm";
import CartList from "../components/CartList";
import { useSelector } from "react-redux";
import { selectCart } from "../store/slices/cartSlice";

export default function PaymentPage() {
  const { cartItems } = useSelector(selectCart);

  const subtotal = cartItems
    .reduce(
      (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
      0
    )
    .toFixed(2);
  const shipping = (cartItems.length ? 5 : 0).toFixed(2);
  const tax = ((parseFloat(subtotal) + parseFloat(shipping)) * 0.0425).toFixed(
    2
  );
  const total = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);

  return (
    <div>
      <div>{<PaymentForm />}</div>
      <div className="reviewOrder">
        <div>{<CartList />}</div>
        <p>subtotal: ${subtotal}</p>
        <p>shipping: ${shipping}</p>
        <p>tax: ${tax}</p>
        <p>order total: ${total}</p>
      </div>
    </div>
  );
}
