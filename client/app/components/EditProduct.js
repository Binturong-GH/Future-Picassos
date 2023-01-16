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

// const validate = yup.object({
//   title: yup.required("Title of product is required."),
//   imageUrl: yup.required("Image URL of product is required."),
//   price: yup
//     .number("Price must be a decimal number.")
//     .equired("Price of product is required."),
// });

export default function EditProduct({ handleClose, open, id }) {
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
