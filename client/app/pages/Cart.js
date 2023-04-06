//cart screen page

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/CartList";
import { fetchUserCart, addToCart } from "../store";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../store/slices/cartSlice";

// MUI
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const navigate = useNavigate();

  const redirectToPayment = () => {
    navigate("/payment");
  };

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CartList />
      <Stack
        direction="column"
        spacing={2}
        alignItems={{ xs: "center", sm: "center", md: "flex-end" }}
      >
        {/* Price information */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Box
            sx={{
              width: "338px",
              px: 4,
              py: 2,
              border: 1,
              borderColor: "grey.500",
            }}
          >
            {/* Subtotal */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
                Subtotal:
              </Typography>
              <div>$ {subtotal}</div>
            </Stack>
            {/* Shipping */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontWeight: "regular", fontSize: 20 }}>
                Shipping Fee:
              </Typography>
              <div>$ {shipping}</div>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {/* Order total */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", fontSize: 32 }}
              >
                Order Total:
              </Typography>
              <div>$ {total}</div>
            </Stack>
          </Box>
          {/* Proceed to checkout */}
        </Stack>
        <Button
          onClick={redirectToPayment}
          variant="contained"
          style={{ width: "404px" }}
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </Container>
  );
};
export default Cart;
