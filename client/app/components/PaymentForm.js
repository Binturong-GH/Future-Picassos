import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewOrderAsync } from "../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  orderItems,
}) {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit working?");
    dispatch(
      addNewOrderAsync({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
      })
    );
    setShippingAddress("");
    setPaymentMethod("");
    setLastName("");
    setFirstName("");
    setCode("");
    setExpiration("");
    navigate("/order");
  };

  return (
    <div>
      <form id="addOrder-form" onSubmit={handleSubmit}>
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
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        name="firstNameInOrderItems"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Last Name</label>
                      <input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        name="LastNameInOrderItems"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Shipping Address</label>
                      <textarea
                        name="shipping-address"
                        value={shippingAddress}
                        onChange={(event) =>
                          setShippingAddress(event.target.value)
                        }
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label> Credit Card Number</label>
                    <input
                      value={paymentMethod}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Exp. Date</label>
                    <input
                      value={expiration}
                      onChange={(event) => setExpiration(event.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Security Code</label>
                    <input
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
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
      </form>
    </div>
  );
}
