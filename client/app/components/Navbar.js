import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/system";

const Navbar = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToAllProducts = () => {
    navigate("/products");
  };

  const redirectToCart = () => {
    navigate("/cart");
  };

  return (
    <AppBar color="secondary" position="stick">
      <Toolbar>
        <IconButton
          onClick={redirectToHome}
          size="small"
          color="primary edge="
          start
          aria-label="label"
        >
          <HomeIcon />
        </IconButton>
        <Typography
          onClick={redirectToHome}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Grace Shopper
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton
            onClick={redirectToAllProducts}
            size="small"
            color="primary edge="
            start
            aria-label="label"
          >
            <ColorLensIcon />
            <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
              All Products
            </Typography>
          </IconButton>
          <IconButton
            size="small"
            color="primary edge="
            start
            aria-label="label"
          >
            <PermIdentityIcon />
            <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
              User Profile
            </Typography>
          </IconButton>
          <IconButton
            onClick={redirectToCart}
            size="small"
            color="primary edge="
            start
            aria-label="label"
          >
            <ShoppingCartIcon />
            <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
              Cart
            </Typography>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
