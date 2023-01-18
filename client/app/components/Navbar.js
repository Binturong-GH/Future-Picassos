import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuList,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Stack } from "@mui/system";

// auth slice to check login status
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../store";

// router
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [isLogged]);

  // MUI handle dropdown menu

  // user dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // admin dropdown menu
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const openAdmin = Boolean(adminAnchorEl);
  const handleAdminMenuClick = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };
  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
  };

  // user logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // redirect to diffenet page
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
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton
            onClick={redirectToHome}
            size="small"
            color="primary"
            edge="start"
            aria-label="label"
          >
            <HomeIcon />
          </IconButton>

          <Typography
            onClick={redirectToHome}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            Future Picassos
          </Typography>

          <Stack direction="row" spacing={2} color="white">
            <IconButton
              onClick={redirectToAllProducts}
              size="small"
              color="primary"
              edge="start"
              aria-label="label"
            >
              <ColorLensIcon />
              <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                All Products
              </Typography>
            </IconButton>

            {isLogged ? (
              <Button
                id="user-button"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <PermIdentityIcon />
              </Button>
            ) : (
              <Button>
                <Link to="/login">Sign In</Link>
              </Button>
            )}

            {isLogged && user.role === "admin" && (
              <Button
                id="admin-button"
                aria-controls={openAdmin ? "admin-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAdmin ? "true" : undefined}
                onClick={handleAdminMenuClick}
              >
                Admin
              </Button>
            )}

            <IconButton
              onClick={redirectToCart}
              size="small"
              color="primary"
              edge="start"
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

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
      >
        <MenuList onClick={handleClose}>Profile</MenuList>
        <MenuList onClick={handleClose}>Order History</MenuList>

        <MenuList onClick={handleClose}>
          <div onClick={handleLogout}>Logout</div>
        </MenuList>
      </Menu>

      <Menu
        id="admin-menu"
        anchorEl={adminAnchorEl}
        open={openAdmin}
        onClose={handleAdminMenuClose}
        MenuListProps={{
          "aria-labelledby": "admin-button",
        }}
      >
        <MenuList onClick={handleAdminMenuClose} sx={{ px: 2 }}>
          <Link to={"/admin/users"}>Users</Link>
        </MenuList>
        <MenuList onClick={handleAdminMenuClose} sx={{ px: 2 }}>
          <Link to={"/admin/products"}>product</Link>
        </MenuList>
      </Menu>
    </>
  );
};

export default Navbar;
