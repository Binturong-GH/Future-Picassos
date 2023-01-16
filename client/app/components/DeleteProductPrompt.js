import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { deleteExisedProduct } from "../store";

export default function DeleteProductPrompt({ handleClose, open, product }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExisedProduct(product.id));
    handleClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm delete product: {product.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="img"
              sx={{
                height: 133,
                width: 150,
              }}
              alt={product.title}
              src={product.imageUrl}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
