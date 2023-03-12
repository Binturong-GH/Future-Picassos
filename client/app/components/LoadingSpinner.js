import React from "react";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";

const LoadingSpinner = () => {
  return (
    <Backdrop
      open
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress variant="solid" size="lg" />
    </Backdrop>
  );
};

export default LoadingSpinner;
