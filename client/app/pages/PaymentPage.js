import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  fetchUserCart,
  deleteProduct,
  incrementOne,
  subtractOne,
} from "../store/slices/cartSlice";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchUserCart(), []);
  });

  const cartRows = cartItems.map((cartItem) => {
    return (
      <tr key={cartItem.id}>
        <td>{cartItem.title}</td>
        <td>${cartItem.price}</td>
        <td>
          <button
            onClick={() => {
              dispatch(subtractOne(cartItem.id));
            }}
          >
            subtract one
          </button>
        </td>
        <td>{cartItem.quantity}</td>
        <td>
          <button
            onClick={() => {
              dispatch(incrementOne(cartItem.id));
            }}
          >
            add one
          </button>
        </td>
        <td>{cartItem.quantity * cartItem.price}</td>
        <td>
          <button
            onClick={() => {
              dispatch(deleteProduct(cartItem.id));
            }}
          >
            Remove from Cart
          </button>
        </td>
      </tr>
    );
  });

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

  var checkout_HTML = "";

  checkout_HTML = (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Shipping & Payment Information</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label> First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label> Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label> Email Address</label>
                    <input type="email" name="email" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Address</label>
                    <textarea
                      rows="2"
                      name="address"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>City</label>
                    <input type="text" name="city" className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>State</label>
                    <input type="text" name="state" className="form-control" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipcode"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label> Credit Card Number</label>
                  <input type="number" name="phone" className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>Exp. Date</label>
                  <input type="text" name="zipcode" className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>Security Code</label>
                  <input type="text" name="zipcode" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
      <div className="card-header">
        <h4>Review Order</h4>
      </div>
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
        <p>subtotal: ${subtotal}</p>
        <p>shipping: ${shipping}</p>
        <p>tax: ${tax}</p>
        <p>order total: ${total}</p>
        <div
          className="modal fade"
          id="payOnlineModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        ></div>
      </div>
      <div className="col-md-12">
        <div className="form-group text-end">
          <button type="button">Place Order</button>
        </div>
      </div>
    </div>
  );
}
