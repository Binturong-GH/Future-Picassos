import React, { Fragment } from "react";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const OrderDetail = ({ shippingAddress }) => {
  return (
    <Box
      sx={{
        m: 4,
        width: {
          md: 250,
        },
      }}
    >
      <Typography variant="h6">Delivery To:</Typography>
      {shippingAddress.split("/").map((part, idx) => {
        return (
          <Typography key={idx} sx={{ fontSize: 20 }}>
            {part}
          </Typography>
        );
      })}
    </Box>
  );
};

export default OrderDetail;
