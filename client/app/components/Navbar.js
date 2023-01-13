import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/system";

const Navbar = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <AppBar color="secondary" position="stick">
      <Toolbar>
        <IconButton size="small" color="primary edge=" start aria-label="label">
          <HomeIcon onClick={redirectToHome} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Grace Shopper
        </Typography>

        <Stack direction="row" spacing={2}>
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            About
          </Typography>
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            Products
          </Typography>
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
