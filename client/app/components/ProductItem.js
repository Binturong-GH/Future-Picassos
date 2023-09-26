import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

import {
  selectCart,
  addToCart,
  addToCartDB,
  setLocalCart,
} from "../store/slices/cartSlice";
// Route
import { Link as RouterLink } from "react-router-dom";

// MUI
import { Box, Stack, Typography, Link, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const styles = {
  imageContainer: {
    height: 233,
    width: 300,
    backgroundImage: "url(./readme/frame-width.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    position: "relative",
  },
  img: {
    position: "absolute",
    height: "170px",
    width: "80%",
    translate: "30px 33px",
  },
};

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(selectCart);

  const handleAdd = () => {
    console.log("Line 41 add to cart");
    dispatch(addToCart(product));
    const req = {
      productId: product.id,
      quantity: 1,
    };
    if (user) {
      dispatch(addToCartDB(req));
    } else {
      dispatch(setLocalCart(cartItems));
    }
  };

  return (
    <Stack
      sx={{
        width: "300px",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 1,
        boxShadow: "2",
        pb: 2,
      }}
    >
      <Link
        component={RouterLink}
        to={`/products/${product.id}`}
        underline="hover"
      >
        <Box style={styles.imageContainer}>
          <img alt={product.title} src={product.imageUrl} style={styles.img} />
        </Box>
      </Link>

      {/* Product name & add to cart */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mt: 2,
        }}
      >
        <Link
          component={RouterLink}
          to={`/products/${product.id}`}
          underline="hover"
        >
          <Stack>
            <Typography>{product.title}</Typography>
            <Typography>${product.price}</Typography>
          </Stack>
        </Link>

        <Button onClick={handleAdd}>
          <Typography>
            <AddShoppingCartIcon />
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default ProductItem;
