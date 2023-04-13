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
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            sx={{ fontWeight: "bold", textAlign: "center", fontSize: 32 }}
          >
            Confirm
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 2, fontSize: 24 }}>
            delete product: {product.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: "auto" }}>
          <Box
            component="img"
            sx={{
              height: 133,
              width: 150,
            }}
            alt={product.title}
            src={product.imageUrl}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained">
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
