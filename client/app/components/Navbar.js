import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuList,
  Box,
  Badge,
  Stack,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// auth slice to check login status
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../store";

// router
import { Link, useNavigate } from "react-router-dom";

//cart slice to check cart total
import {
  selectCart,
  fetchUserCart,
  getLocalCart,
} from "../store/slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(selectCart);

  useEffect(() => {
    dispatch(getMe());
  }, [isLogged]);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart());
    } else {
      dispatch(getLocalCart());
    }
  }, []);

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
  const redirectTo = (page) => {
    navigate(page);
  };

  const cartTotal = (cartArr) => {
    return cartArr.reduce((total, prod) => total + prod.quantity, 0);
  };

  return (
    <Box>
      <AppBar color="primary" position="static" sx={{ px: 3, py: 1 }}>
        {/* flex container  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: Project Name & Icon */}
          <Stack direction="row" space={0.5} sx={{ color: "white" }}>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: {
                  xs: 10,
                  sm: 16,
                  md: 24,
                },
              }}
            >
              Future Picassos
            </Typography>
          </Stack>

          {/* Middle: Home, art  */}
          <Stack direction="row" spacing={4} sx={{ ml: 5, color: "white" }}>
            <Button
              onClick={() => redirectTo("/")}
              size="large"
              color="inherit"
              variant="text"
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => redirectTo("/products")}
              size="large"
              color="inherit"
              variant="text"
            >
              Art
            </Button>
          </Stack>

          {/* Right: Cart and Sign in */}
          <Stack direction="row" spacing={4} sx={{ ml: 5, color: "white" }}>
            {/* Cart */}
            <Button
              size="large"
              color="inherit"
              variant="text"
              onClick={() => redirectTo("/cart")}
            >
              <Badge
                badgeContent={cartTotal(cartItems)}
                sx={{ color: "white" }}
              >
                <ShoppingCartIcon />
              </Badge>
              <Typography sx={{ ml: 1 }}>Cart</Typography>
            </Button>
            {/* Sign in */}
            {isLogged ? (
              <Button
                id="user-button"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <PermIdentityIcon
                  sx={{
                    color: "white",
                  }}
                />
              </Button>
            ) : (
              <Button variant="text" size="large" color="inherit">
                <Link to="/login">
                  <Typography sx={{ color: "white" }}>Sign In </Typography>
                </Link>
              </Button>
            )}

            {/* Admin menu */}
            {isLogged && user.role === "admin" && (
              <Button
                id="admin-button"
                aria-controls={openAdmin ? "admin-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAdmin ? "true" : undefined}
                onClick={handleAdminMenuClick}
              >
                <Typography sx={{ color: "white" }}>Admin</Typography>
              </Button>
            )}
          </Stack>
        </Box>
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
        <MenuList onClick={handleClose} sx={{ px: 2 }}>
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
    </Box>
  );
};

export default Navbar;
