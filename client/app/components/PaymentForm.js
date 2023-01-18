import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewOrderAsync } from "../store/slices/orderSlice";

export default function PaymentForm() {
  const [orderItems, setOrderItems] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addNewOrderAsync({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
      })
    );
    setOrderItems("");
    setShippingAddress("");
    setPaymentMethod("");
  };

  return (
    <div>
      <form id="addOrder-form" onSubmit={handleSubmit}></form>
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
                      name="firstNameInOrderItems"
                      className="form-control"
                      value={orderItems}
                      onChange={(event) => setOrderItems(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label> Last Name</label>
                    <input
                      name="LastNameInOrderItems"
                      className="form-control"
                      value={orderItems}
                      onChange={(event) => setOrderItems(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label> Email Address</label>
                    <input
                      className="form-control"
                      name="emailInOrderItems"
                      value={orderItems}
                      onChange={(event) => setOrderItems(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>State</label>
                    <input
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                      type="text"
                      name="state"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label>Zip Code</label>
                    <input
                      value={shippingAddress}
                      onChange={(event) =>
                        setShippingAddress(event.target.value)
                      }
                      type="text"
                      name="zipcode"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label> Credit Card Number</label>
                  <input
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethods(event.target.value)}
                    type="number"
                    name="phone"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Exp. Date</label>
                  <input
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethods(event.target.value)}
                    type="text"
                    name="zipcode"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Security Code</label>
                  <input
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethods(event.target.value)}
                    type="text"
                    name="zipcode"
                    className="form-control"
                  />
                </div>

                <div className="col-md-12">
                  <div className="form-group text-end">
                    <button type="submit">Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
