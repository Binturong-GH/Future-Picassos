import React, { Fragment } from "react";

// Redux
import { useDispatch } from "react-redux";
import { addNewOrderAsync } from "../store/slices/orderSlice";

// Formik
import { useFormik } from "formik";
import * as yup from "yup";

// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const validate = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your First Name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .required("Last name is required"),

  address: yup.string("Enter your Address").required("Address is required"),
  country: yup.string("Enter your country").required("Country is required"),
  state: yup.string("Enter your state").required("State is required"),
  zipCode: yup.string("Enter your Zip Code").required("Zip code is required"),
});

const PaymentForm = ({ orderItem, subtotal, shipping, tax, total }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      firstName: "John",
      lastName: "Doe",
      address: "dummy address",
      country: "XX",
      state: "XX",
      zipCode: "00000",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      dispatch(
        addNewOrderAsync({
          orderItems: orderItem.map((item) => {
            return `productId:${item.id}`;
          }),
          shippingAddress: ` ${values.firstName} ${values.lastName} ${values.address} ${values.country} ${values.state}, ${values.zipCode}`,
          itemsPrice: Number(subtotal),
          shippingPrice: Number(shipping),
          taxPrice: Number(tax),
          totalPrice: Number(total),
        })
      );
    },
  });
  // 12@s.c
  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        {/* Part 1: Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Firstname */}
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          {/* lastname */}
          <TextField
            sx={{ ml: 4 }}
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
        {/* Email */}
        <Box>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        {/* Address */}
        <Box>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Box>

        {/*  Part: country, state, zip code */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Country */}
          <TextField
            fullWidth
            id="country"
            name="country"
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />

          {/* State */}
          <TextField
            sx={{ ml: 2 }}
            fullWidth
            id="state"
            name="state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />

          {/* Postcode */}
          <TextField
            sx={{ ml: 2 }}
            fullWidth
            id="zipCode"
            name="zipCode"
            label="Zip code"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
          />
        </Box>
        <Box sx={{ pl: 2 }}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Checkout
          </Button>
        </Box>
      </form>
    </Fragment>
  );
};

export default PaymentForm;

/*

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
*/
