import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../store";

// Route
import { Link as RouterLink } from "react-router-dom";

// MUI
import { Box, Stack, Typography, Link, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <Box
      sx={{
        width: "300px",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 1,
        boxShadow: "2",
        pb: 2,
      }}
    >
      <Stack>
        <Link
          component={RouterLink}
          to={`/products/${product.id}`}
          underline="hover"
        >
          <Box
            component="img"
            alt={product.title}
            src={product.imageUrl}
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 200, md: 233 },
              maxWidth: { xs: 180, md: 250, lg: 300 },
            }}
          />
        </Link>

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
    </Box>
  );
};

export default ProductItem;
