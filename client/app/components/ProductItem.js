import React from "react";

// MUI
import { Box, Stack, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductItem = ({ product }) => {
  return (
    <Box
      sx={{
        width: "300px",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 1,
        boxShadow: "2",
        py: 2,
      }}
    >
      <Stack>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{product.title}</Typography>
          <Typography>{product.price}</Typography>
          <Typography>
            <AddShoppingCartIcon />
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductItem;
