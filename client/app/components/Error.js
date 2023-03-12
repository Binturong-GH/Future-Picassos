import React from "react";
import { Alert } from "@mui/material";
const Error = ({ error }) => {
  return <Alert severity="error">{error}</Alert>;
};

export default Error;
