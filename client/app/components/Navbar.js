import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuList,
  Box,
  Badge,
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
  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToAllProducts = () => {
    navigate("/products");
  };

  const redirectToCart = () => {
    navigate("/cart");
  };

  const cartTotal = (cartArr) => {
    return cartArr.reduce((total, prod) => total + prod.quantity, 0);
  };

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Box sx={{ color: "white", mr: 2 }}>
            <IconButton
              onClick={redirectToHome}
              size="small"
              color="inherit"
              edge="start"
              aria-label="label"
            >
              <HomeIcon />
            </IconButton>
          </Box>

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
            <Box sx={{ color: "white" }}>
              <IconButton
                onClick={redirectToAllProducts}
                size="small"
                color="inherit"
                edge="start"
                aria-label="label"
              >
                <ColorLensIcon />
                <Typography
                  variant="h8"
                  component="div"
                  sx={{ flexGrow: 1, ml: 1 }}
                >
                  All Artist
                </Typography>
              </IconButton>
            </Box>

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
              <Button>
                <Link to="/login">
                  <Typography sx={{ color: "white" }}>Sign In</Typography>
                </Link>
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

            <Box sx={{ color: "white", ml: 2 }}>
              <IconButton
                onClick={redirectToCart}
                size="small"
                color="inherit"
                edge="start"
                aria-label="label"
                sx={{ m: 4 }}
              >
                <Badge
                  badgeContent={cartTotal(cartItems)}
                  sx={{
                    color: "success",
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>

                <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
                  Cart
                </Typography>
              </IconButton>
            </Box>
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
    </>
  );
};

export default Navbar;
