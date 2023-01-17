import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function PaymentForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewOrderAsync({ name, address }));
    setName("");
    setAddress("");
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
                      name="firstName"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
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

                <div className="col-md-12">
                  <div className="form-group text-end">
                    <button type="button">Place Order</button>
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
