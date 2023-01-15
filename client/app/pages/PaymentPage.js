import React from "react";
import CartList from "../components/CartList";

export default function PaymentPage() {
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

  return (
    <div>
      <CartList />
      <div
        className="modal fade"
        id="payOnlineModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      ></div>

      <div className="py-4">
        <div className="container">{checkout_HTML}</div>
      </div>
    </div>
  );
}
