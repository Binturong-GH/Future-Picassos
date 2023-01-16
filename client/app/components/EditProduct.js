import React, { useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneProductAsync } from "../store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validate = yup.object({
  title: yup
    .string("Enter title of product")
    .required("Title of product is required."),
  imageUrl: yup
    .string("Enter Imgae URL of product.")
    .required("Image URL of product is required."),
  price: yup
    .number("Price must be a decimal number.")
    .required("Price of product is required."),
  description: yup.string("Enter description of product"),
  artistName: yup.string("Enter name of artist"),
  age: yup.number("Enter age of artist."),
  countInStock: yup.number("Enter count in stock of product."),
});

export default function EditProduct({ handleClose, open, id }) {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchOneProductAsync(id));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
      artistName: product.artistName,
      age: product.age,
      countInStock: product.countInStock,
    },
    enableReinitialize: true,
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
